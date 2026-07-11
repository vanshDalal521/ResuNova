const { Router } = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const { getFreeUsageStatus, requireFeature } = require("../services/entitlement.service")

const entitlementRouter = Router()

/**
 * GET /api/entitlements
 * Returns plan, usage, and feature flags for the current user.
 */
entitlementRouter.get("/", authMiddleware.authUser, async (req, res) => {
    try {
        const status = await getFreeUsageStatus(req.user.id)
        res.json({ success: true, ...status })
    } catch (err) {
        console.error("Entitlement fetch error:", err.message)
        res.status(500).json({ success: false, message: "Failed to fetch entitlements" })
    }
})

/**
 * POST /api/entitlements/require-feature
 * Checks if the user has access to a specific feature.
 * Body: { feature: "BEHAVIORAL_QUESTIONS" | "SEVEN_DAY_PLAN" | "TECHNICAL_QUESTIONS" }
 */
entitlementRouter.post("/require-feature", authMiddleware.authUser, async (req, res) => {
    try {
        const { feature } = req.body
        if (!feature) {
            return res.status(400).json({ success: false, message: "Feature is required" })
        }
        await requireFeature(req.user.id, feature)
        res.json({ success: true, granted: true })
    } catch (err) {
        const statusCode = err.statusCode || 403
        res.status(statusCode).json({
            success: false,
            granted: false,
            error: {
                code: err.code || "PRO_FEATURE_REQUIRED",
                message: err.message,
                upgradeRequired: true,
            },
        })
    }
})

module.exports = entitlementRouter
