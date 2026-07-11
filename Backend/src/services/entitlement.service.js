const userModel = require("../models/user.model")
const usageEventModel = require("../models/usageEvent.model")
const crypto = require("crypto")

const PLAN_ENTITLEMENTS = {
    starter: {
        analysesPerRolling24Hours: 3,
        technicalQuestions: true,
        behavioralQuestions: false,
        sevenDayPlan: false,
    },
    pro: {
        analysesPerRolling24Hours: null,
        technicalQuestions: true,
        behavioralQuestions: true,
        sevenDayPlan: true,
    },
}

const RESERVATION_TTL_MS = 15 * 60 * 1000

/**
 * Check whether a user is actively Pro.
 */
function isActivePro(user) {
    return user.plan === "pro" && user.subscriptionStatus === "active"
}

/**
 * Get the effective entitlements for a user.
 */
async function getUserEntitlements(userId) {
    const user = await userModel.findById(userId).select("plan subscriptionStatus reportsUsedThisMonth lastReportReset")
    if (!user) throw new Error("User not found")

    return computeEntitlements(user)
}

function computeEntitlements(user) {
    const planKey = isActivePro(user) ? "pro" : "starter"
    const caps = PLAN_ENTITLEMENTS[planKey]
    return {
        plan: planKey,
        subscriptionStatus: user.subscriptionStatus,
        ...caps,
    }
}

/**
 * Get rolling 24-hour usage status for a free user.
 * Counts COMPLETED events + active RESERVED/PROCESSING events within the window.
 */
async function getFreeUsageStatus(userId) {
    const user = await userModel.findById(userId).select("plan subscriptionStatus reportsUsedThisMonth lastReportReset")
    if (!user) throw new Error("User not found")

    if (isActivePro(user)) {
        return {
            plan: "pro",
            usage: {
                limit: null,
                used: null,
                remaining: null,
                windowHours: 24,
                blocked: false,
                nextResetAt: null,
            },
            features: {
                technicalQuestions: true,
                behavioralQuestions: true,
                sevenDayPlan: true,
            },
        }
    }

    const now = new Date()
    const windowStart = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const [completedCount, reservedCount] = await Promise.all([
        usageEventModel.countDocuments({
            userId,
            type: "PROFILE_ANALYSIS",
            status: "COMPLETED",
            planAtTimeOfUsage: "starter",
            createdAt: { $gte: windowStart, $lte: now },
        }),
        usageEventModel.countDocuments({
            userId,
            type: "PROFILE_ANALYSIS",
            status: { $in: ["RESERVED", "PROCESSING"] },
            planAtTimeOfUsage: "starter",
            createdAt: { $gte: windowStart },
            expiresAt: { $gt: now },
        }),
    ])

    const limit = PLAN_ENTITLEMENTS.starter.analysesPerRolling24Hours
    const totalActive = completedCount + reservedCount
    const blocked = totalActive >= limit
    const remaining = Math.max(0, limit - totalActive)

    // Find the earliest completed event in the window — that's what will drop off first
    let nextResetAt = null
    if (completedCount >= limit) {
        const oldestInWindow = await usageEventModel
            .findOne({
                userId,
                type: "PROFILE_ANALYSIS",
                status: "COMPLETED",
                planAtTimeOfUsage: "starter",
                createdAt: { $gte: windowStart },
            })
            .sort({ createdAt: 1 })
        if (oldestInWindow) {
            nextResetAt = new Date(oldestInWindow.createdAt.getTime() + 24 * 60 * 60 * 1000)
        }
    }

    return {
        plan: "starter",
        usage: {
            limit,
            used: completedCount,
            remaining,
            windowHours: 24,
            blocked,
            nextResetAt: nextResetAt ? nextResetAt.toISOString() : null,
        },
        features: {
            technicalQuestions: true,
            behavioralQuestions: false,
            sevenDayPlan: false,
        },
    }
}

/**
 * Require a specific feature. Throws if not entitled.
 */
async function requireFeature(userId, feature) {
    const user = await userModel.findById(userId).select("plan subscriptionStatus reportsUsedThisMonth lastReportReset")
    if (!user) {
        const err = new Error("User not found")
        err.statusCode = 401
        throw err
    }

    const entitlements = computeEntitlements(user)

    if (feature === "PROFILE_ANALYSIS") {
        return true
    }

    if (feature === "TECHNICAL_QUESTIONS") {
        if (!entitlements.technicalQuestions) {
            const err = new Error("Technical questions require an active Pro subscription.")
            err.statusCode = 403
            err.code = "PRO_FEATURE_REQUIRED"
            throw err
        }
        return true
    }

    if (feature === "BEHAVIORAL_QUESTIONS") {
        if (!entitlements.behavioralQuestions) {
            const err = new Error("Behavioral questions require an active Pro subscription.")
            err.statusCode = 403
            err.code = "PRO_BEHAVIORAL_QUESTIONS_REQUIRED"
            throw err
        }
        return true
    }

    if (feature === "SEVEN_DAY_PLAN") {
        if (!entitlements.sevenDayPlan) {
            const err = new Error("The complete 7-day preparation plan requires an active Pro subscription.")
            err.statusCode = 403
            err.code = "PRO_SEVEN_DAY_PLAN_REQUIRED"
            throw err
        }
        return true
    }

    return true
}

/**
 * Atomically reserve an analysis slot for a free user.
 * Returns the reservation event if successful, null if limit reached.
 */
async function reserveAnalysisUsage(userId, requestId) {
    const user = await userModel.findById(userId).select("plan subscriptionStatus")
    if (!user) return null

    if (isActivePro(user)) {
        // Pro users don't need reservations — just return a dummy
        return { _id: "pro-skip", userId, status: "COMPLETED", planAtTimeOfUsage: "pro" }
    }

    const now = new Date()
    const windowStart = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const limit = PLAN_ENTITLEMENTS.starter.analysesPerRolling24Hours

    // Count current active usage (completed + valid reservations) atomically
    const [completedCount, reservedCount] = await Promise.all([
        usageEventModel.countDocuments({
            userId,
            type: "PROFILE_ANALYSIS",
            status: "COMPLETED",
            planAtTimeOfUsage: "starter",
            createdAt: { $gte: windowStart, $lte: now },
        }),
        usageEventModel.countDocuments({
            userId,
            type: "PROFILE_ANALYSIS",
            status: { $in: ["RESERVED", "PROCESSING"] },
            planAtTimeOfUsage: "starter",
            createdAt: { $gte: windowStart },
            expiresAt: { $gt: now },
        }),
    ])

    if (completedCount + reservedCount >= limit) {
        return null
    }

    // Check for duplicate requestId
    const existing = await usageEventModel.findOne({ requestId })
    if (existing) {
        return existing
    }

    const event = await usageEventModel.create({
        userId,
        type: "PROFILE_ANALYSIS",
        status: "RESERVED",
        requestId,
        planAtTimeOfUsage: "starter",
        expiresAt: new Date(now.getTime() + RESERVATION_TTL_MS),
    })

    return event
}

/**
 * Mark a reservation as COMPLETED.
 */
async function completeAnalysisUsage(requestId, reportId) {
    const event = await usageEventModel.findOneAndUpdate(
        { requestId },
        {
            status: "COMPLETED",
            reportId,
            completedAt: new Date(),
        },
        { returnDocument: "after" }
    )
    return event
}

/**
 * Mark a reservation as FAILED.
 */
async function failAnalysisUsage(requestId) {
    const event = await usageEventModel.findOneAndUpdate(
        { requestId },
        {
            status: "FAILED",
            failedAt: new Date(),
        },
        { returnDocument: "after" }
    )
    return event
}

/**
 * Release expired reservations (cron-like cleanup).
 */
async function releaseExpiredReservations() {
    await usageEventModel.updateMany(
        {
            status: { $in: ["RESERVED", "PROCESSING"] },
            expiresAt: { $lte: new Date() },
        },
        { status: "CANCELLED" }
    )
}

/**
 * Generate a unique idempotency key.
 */
function generateRequestId(userId) {
    return `${userId.toString()}-${crypto.randomUUID()}`
}

/**
 * Serialize a report for a given user based on entitlements.
 */
function serializeReportForUser(report, user) {
    const planKey = isActivePro(user) ? "pro" : "starter"
    const caps = PLAN_ENTITLEMENTS[planKey]

    return {
        _id: report._id,
        jobDescription: report.jobDescription,
        companyName: report.companyName,
        resume: report.resume,
        selfDescription: report.selfDescription,
        matchScore: report.matchScore,
        title: report.title,
        skillGaps: report.skillGaps,
        technicalQuestions: caps.technicalQuestions ? report.technicalQuestions : (report.technicalQuestions || []),
        behavioralQuestions: caps.behavioralQuestions ? report.behavioralQuestions : null,
        behavioralQuestionsLocked: !caps.behavioralQuestions,
        preparationPlan: caps.sevenDayPlan ? report.preparationPlan : null,
        preparationPlanLocked: !caps.sevenDayPlan,
        atsBuzzwords: report.atsBuzzwords,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
        user: report.user,
    }
}

module.exports = {
    getUserEntitlements,
    getFreeUsageStatus,
    requireFeature,
    reserveAnalysisUsage,
    completeAnalysisUsage,
    failAnalysisUsage,
    releaseExpiredReservations,
    generateRequestId,
    serializeReportForUser,
    computeEntitlements,
    isActivePro,
    PLAN_ENTITLEMENTS,
}
