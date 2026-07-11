const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const { z } = require("zod")

// Zod schemas for input validation
const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .max(100, "Email is too long"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password is too long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
})

const loginSchema = z.object({
    email: z.string().trim().min(1, "Email or username is required"),
    password: z.string().min(1, "Password is required"),
})

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
}

/**
 * @name registerUserController
 * @description register a new user
 * @access Public
 */
async function registerUserController(req, res) {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
        const firstError = parsed.error.errors[0]
        return res.status(400).json({ message: firstError.message })
    }

    const { username, email, password } = parsed.data

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 12)

    const user = await userModel.create({
        username,
        email: email.toLowerCase(),
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, COOKIE_OPTIONS)

    const { getFreeUsageStatus } = require("../services/entitlement.service")
    let entitlements = null
    try {
        entitlements = await getFreeUsageStatus(user._id)
    } catch { }

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            plan: user.plan,
            reportsUsedThisMonth: user.reportsUsedThisMonth,
            createdAt: user.createdAt
        },
        entitlements,
    })
}

/**
 * @name loginUserController
 * @description login a user with email and password
 * @access Public
 */
async function loginUserController(req, res) {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
        const firstError = parsed.error.errors[0]
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const { email, password } = parsed.data

    const user = await userModel.findOne({
        $or: [
            { email: email.toLowerCase() },
            { username: email }
        ]
    })

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, COOKIE_OPTIONS)

    const { getFreeUsageStatus } = require("../services/entitlement.service")
    let entitlements = null
    try {
        entitlements = await getFreeUsageStatus(user._id)
    } catch { }

    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            plan: user.plan,
            reportsUsedThisMonth: user.reportsUsedThisMonth,
            createdAt: user.createdAt
        },
        entitlements,
    })
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        try {
            await tokenBlacklistModel.create({ token })
        } catch {
            // ignore duplicate blacklist entries
        }
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })

    res.status(200).json({ message: "User logged out successfully" })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id).select("-password")

    if (!user) {
        return res.status(401).json({ message: "User not found" })
    }

    const { getFreeUsageStatus } = require("../services/entitlement.service")
    let entitlements = null
    try {
        entitlements = await getFreeUsageStatus(req.user.id)
    } catch { }

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            plan: user.plan,
            subscriptionStatus: user.subscriptionStatus,
            reportsUsedThisMonth: user.reportsUsedThisMonth,
            createdAt: user.createdAt,
        },
        entitlements,
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
