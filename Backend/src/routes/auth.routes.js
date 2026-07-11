const { Router } = require('express')
const rateLimit = require('express-rate-limit')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

// Rate limit login/register — higher in dev for testing
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === "production" ? 10 : 50,
    message: { success: false, message: "Too many attempts. Please try again in 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
})

authRouter.post("/register", authLimiter, authController.registerUserController)
authRouter.post("/login", authLimiter, authController.loginUserController)
authRouter.get("/logout", authController.logoutUserController)
authRouter.get("/get-me", authController.getMeController)

module.exports = authRouter
