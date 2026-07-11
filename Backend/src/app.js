const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const helmet = require("helmet")
const hpp = require("hpp")

const app = express()

// Trust Render/Vercel/Heroku proxy for rate limiting, secure cookies, IP detection
app.set("trust proxy", true)

// Stripe webhook handler — require early for webhook route placement
const paymentController = require("./controllers/payment.controller")

// Security headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
}))

// CORS — strict, only allow frontend origin
const ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
]
app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    maxAge: 86400,
}))

// Stripe webhook route — MUST be before express.json() for raw body
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), paymentController.handleWebhook)

// Body parsing with size limits
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "1mb" }))
app.use(cookieParser())

// Custom NoSQL injection sanitizer (compatible with Express 5)
const NOSQL_REGEX = /^\$|\./;
function sanitizeValue(val) {
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.map(sanitizeValue);
    if (val && typeof val === 'object') {
        const clean = {};
        for (const key of Object.keys(val)) {
            if (!NOSQL_REGEX.test(key)) {
                clean[key] = sanitizeValue(val[key]);
            }
        }
        return clean;
    }
    return val;
}
app.use((req, res, next) => {
    if (req.body && typeof req.body === 'object') req.body = sanitizeValue(req.body);
    if (req.params && typeof req.params === 'object') {
        try { req.params = sanitizeValue(req.params); } catch {}
    }
    next()
})

// Prevent HTTP parameter pollution
app.use(hpp({ whitelist: [] }))

// Request Logger
app.use((req, res, next) => {
    const dbState = mongoose.connection.readyState
    const states = ["disconnected", "connected", "connecting", "disconnecting"]
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - DB: ${states[dbState] || "unknown"}`)
    next()
})

app.get("/api/health", (req, res) => {
    res.json({ message: "ResuNova Backend is running successfully!" })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")
const paymentRouter = require("./routes/payment.routes")
const entitlementRouter = require("./routes/entitlement.routes")
const errorHandler = require("./middlewares/error.middleware")
const { releaseExpiredReservations } = require("./services/entitlement.service")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/entitlements", entitlementRouter)

/* Serve frontend static files in production */
const frontendDist = path.join(__dirname, "../../Frontend/dist")
app.use(express.static(frontendDist))

/* Periodic cleanup of expired reservations (every 5 minutes) */
setInterval(() => {
    releaseExpiredReservations().catch(err => console.error("Reservation cleanup error:", err.message))
}, 5 * 60 * 1000)

/* Global Error Handler */
app.use(errorHandler)

/* SPA fallback — catch-all for non-API GET requests */
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.join(frontendDist, "index.html"))
    } else {
        next()
    }
})

module.exports = app
