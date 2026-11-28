const userModel = require("../models/user.model")
const interviewReportModel = require("../models/interviewReport.model")
const usageEventModel = require("../models/usageEvent.model")

/**
 * GET /api/admin/stats
 * Aggregate platform-wide statistics for the Admin Panel.
 */
async function getAdminStatsController(req, res, next) {
    try {
        const now = new Date()
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)

        const [
            totalUsers,
            adminUsers,
            proUsers,
            totalReports,
            scoreAgg,
            recentAnalysesTotal,
            recentAnalysesCompleted,
            recentAnalysesFailed,
        ] = await Promise.all([
            userModel.countDocuments(),
            userModel.countDocuments({ role: "admin" }),
            userModel.countDocuments({ plan: "pro", subscriptionStatus: "active" }),
            interviewReportModel.countDocuments(),
            interviewReportModel.aggregate([
                { $group: { _id: null, avgScore: { $avg: "$matchScore" } } }
            ]),
            usageEventModel.countDocuments({ createdAt: { $gte: last24h } }),
            usageEventModel.countDocuments({ createdAt: { $gte: last24h }, status: "COMPLETED" }),
            usageEventModel.countDocuments({ createdAt: { $gte: last24h }, status: "FAILED" }),
        ])

        const avgMatchScore = scoreAgg.length > 0 && scoreAgg[0].avgScore != null
            ? Math.round(scoreAgg[0].avgScore)
            : 0

        res.json({
            success: true,
            stats: {
                totalUsers,
                adminUsers,
                proUsers,
                starterUsers: Math.max(0, totalUsers - proUsers),
                totalReports,
                avgMatchScore,
                analyses24h: {
                    total: recentAnalysesTotal,
                    completed: recentAnalysesCompleted,
                    failed: recentAnalysesFailed,
                },
            },
        })
    } catch (error) {
        console.error("getAdminStats error:", error.message)
        next(error)
    }
}

/**
 * GET /api/admin/users
 * List all users with report counts.
 */
async function getAdminUsersController(req, res, next) {
    try {
        const users = await userModel
            .find()
            .select("-password -__v")
            .sort({ createdAt: -1 })
            .lean()

        const reportCounts = await interviewReportModel.aggregate([
            { $group: { _id: "$user", count: { $sum: 1 } } }
        ])

        const countMap = new Map()
        for (const item of reportCounts) {
            if (item._id) countMap.set(item._id.toString(), item.count)
        }

        const enrichedUsers = users.map(u => ({
            ...u,
            reportCount: countMap.get(u._id.toString()) || 0,
        }))

        res.json({
            success: true,
            users: enrichedUsers,
        })
    } catch (error) {
        console.error("getAdminUsers error:", error.message)
        next(error)
    }
}

/**
 * PATCH /api/admin/users/:userId
 * Update a user's plan, subscriptionStatus, or role.
 */
async function updateAdminUserController(req, res, next) {
    try {
        const { userId } = req.params
        const { plan, subscriptionStatus, role } = req.body

        const targetUser = await userModel.findById(userId).select("-password")
        if (!targetUser) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        // Prevent admin from demoting themselves
        if (targetUser._id.toString() === req.user.id && role && role !== "admin") {
            return res.status(400).json({ success: false, message: "Cannot remove your own admin role" })
        }

        if (plan && ["starter", "pro"].includes(plan)) {
            targetUser.plan = plan
            if (plan === "pro" && subscriptionStatus === undefined) {
                targetUser.subscriptionStatus = "active"
            } else if (plan === "starter" && subscriptionStatus === undefined) {
                targetUser.subscriptionStatus = null
            }
        }

        if (subscriptionStatus !== undefined) {
            targetUser.subscriptionStatus = subscriptionStatus
        }

        if (role && ["user", "admin"].includes(role)) {
            targetUser.role = role
            if (role === "admin") {
                targetUser.plan = "pro"
                targetUser.subscriptionStatus = "active"
            }
        }

        await targetUser.save()

        res.json({
            success: true,
            message: `Updated ${targetUser.username} successfully`,
            user: targetUser,
        })
    } catch (error) {
        console.error("updateAdminUser error:", error.message)
        next(error)
    }
}

/**
 * DELETE /api/admin/users/:userId
 * Delete a user and their associated reports & usage events.
 */
async function deleteAdminUserController(req, res, next) {
    try {
        const { userId } = req.params

        if (userId === req.user.id) {
            return res.status(400).json({ success: false, message: "Cannot delete your own admin account" })
        }

        const deleted = await userModel.findByIdAndDelete(userId)
        if (!deleted) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        await Promise.all([
            interviewReportModel.deleteMany({ user: userId }),
            usageEventModel.deleteMany({ userId }),
        ])

        res.json({
            success: true,
            message: `Deleted user ${deleted.username}`,
        })
    } catch (error) {
        console.error("deleteAdminUser error:", error.message)
        next(error)
    }
}

/**
 * GET /api/admin/reports
 * List all interview reports across all users.
 */
async function getAdminReportsController(req, res, next) {
    try {
        const reports = await interviewReportModel
            .find()
            .sort({ createdAt: -1 })
            .limit(100)
            .populate("user", "username email role plan")
            .select("title companyName matchScore user createdAt technicalQuestions behavioralQuestions preparationPlan skillGaps")
            .lean()

        const formatted = reports.map(r => ({
            _id: r._id,
            title: r.title,
            companyName: r.companyName || "General",
            matchScore: r.matchScore,
            user: r.user || { username: "Unknown", email: "—" },
            technicalCount: r.technicalQuestions?.length || 0,
            behavioralCount: r.behavioralQuestions?.length || 0,
            roadmapDays: r.preparationPlan?.length || 0,
            skillGapsCount: r.skillGaps?.length || 0,
            createdAt: r.createdAt,
        }))

        res.json({
            success: true,
            reports: formatted,
        })
    } catch (error) {
        console.error("getAdminReports error:", error.message)
        next(error)
    }
}

/**
 * DELETE /api/admin/reports/:reportId
 * Delete an interview report.
 */
async function deleteAdminReportController(req, res, next) {
    try {
        const { reportId } = req.params
        const deleted = await interviewReportModel.findByIdAndDelete(reportId)
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Report not found" })
        }
        res.json({
            success: true,
            message: "Report deleted successfully",
        })
    } catch (error) {
        console.error("deleteAdminReport error:", error.message)
        next(error)
    }
}

module.exports = {
    getAdminStatsController,
    getAdminUsersController,
    updateAdminUserController,
    deleteAdminUserController,
    getAdminReportsController,
    deleteAdminReportController,
}
