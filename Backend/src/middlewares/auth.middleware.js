const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const userModel = require("../models/user.model")

async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token."
        })
    }

}

async function requireAdmin(req, res, next) {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ success: false, message: "Authentication required" })
        }
        const user = await userModel.findById(req.user.id).select("role username email plan subscriptionStatus")
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Admin privileges required",
            })
        }
        req.adminUser = user
        next()
    } catch (err) {
        console.error("requireAdmin error:", err.message)
        return res.status(500).json({ success: false, message: "Server error verifying admin privileges" })
    }
}

module.exports = { authUser, requireAdmin }