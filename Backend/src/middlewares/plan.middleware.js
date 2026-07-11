const userModel = require("../models/user.model")

const STARTER_MONTHLY_LIMIT = 3

async function requirePro(req, res, next) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }
        if (user.plan !== "pro" || user.subscriptionStatus !== "active") {
            return res.status(403).json({
                success: false,
                message: "This feature requires an active Pro subscription.",
            })
        }
        req.dbUser = user
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error checking plan" })
    }
}

async function checkReportLimit(req, res, next) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        // Reset counter if a month has passed
        const now = new Date()
        const lastReset = new Date(user.lastReportReset)
        const diffMonths = (now.getFullYear() - lastReset.getFullYear()) * 12 + now.getMonth() - lastReset.getMonth()

        if (diffMonths >= 1) {
            user.reportsUsedThisMonth = 0
            user.lastReportReset = now
            await user.save()
        }

        // Pro users have unlimited reports
        if (user.plan === "pro" && user.subscriptionStatus === "active") {
            req.dbUser = user
            return next()
        }

        // Starter users have a limit
        if (user.reportsUsedThisMonth >= STARTER_MONTHLY_LIMIT) {
            return res.status(403).json({
                success: false,
                message: `You've used all ${STARTER_MONTHLY_LIMIT} free reports this month. Upgrade to Pro for unlimited reports.`,
            })
        }

        req.dbUser = user
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error checking report limit" })
    }
}

async function incrementReportCount(userId) {
    const result = await userModel.findOneAndUpdate(
        {
            _id: userId,
            $or: [
                { plan: "pro", subscriptionStatus: "active" },
                { reportsUsedThisMonth: { $lt: STARTER_MONTHLY_LIMIT } }
            ]
        },
        { $inc: { reportsUsedThisMonth: 1 } },
        { new: true, select: "reportsUsedThisMonth plan subscriptionStatus" }
    )
    return result
}

async function decrementReportCount(userId) {
    const user = await userModel.findById(userId)
    if (user && user.reportsUsedThisMonth > 0) {
        user.reportsUsedThisMonth -= 1
        await user.save()
    }
}

module.exports = { requirePro, checkReportLimit, incrementReportCount, decrementReportCount, STARTER_MONTHLY_LIMIT }
