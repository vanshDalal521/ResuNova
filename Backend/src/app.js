const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

console.log("[DEBUG] app.js initialized with manual CORS");

// TOP OF STACK CORS middleware
app.use((req, res, next) => {
    res.setHeader("X-CORS-Fix-Active", "true");
    const origin = req.headers.origin;
    const allowedOrigins = [
        process.env.FRONTEND_URL,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5175",
        "http://127.0.0.1:5175"
    ].map(o => o?.trim()).filter(Boolean);

    console.log(`[DEBUG] CORS Check: Origin=${origin}, Allowed=${JSON.stringify(allowedOrigins)}`);

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else if (origin) {
        // For debugging: if origin exists but not matched, still set SOMETHING
        res.setHeader("Access-Control-Allow-Origin", "NOT_MATCHED_" + origin);
    }
    
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With,Accept");

    if (req.method === "OPTIONS") {
        console.log(`[DEBUG] Handling OPTIONS for ${req.url} from ${origin}`);
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json())
app.use(cookieParser())

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")
const errorHandler = require("./middlewares/error.middleware")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* Global Error Handler */
app.use(errorHandler)



module.exports = app