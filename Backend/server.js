require("dotenv").config()

// Validate critical env vars at startup
const REQUIRED_ENV = ["MONGO_URI", "JWT_SECRET", "GOOGLE_GENAI_API_KEY"]
for (const key of REQUIRED_ENV) {
    if (!process.env[key]) {
        console.error(`FATAL: Missing required environment variable: ${key}`)
        process.exit(1)
    }
}

const app = require("./src/app")
const connectToDB = require("./src/config/database")

async function startServer() {
    try {
        await connectToDB()
        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.error("Failed to start server:", err)
        process.exit(1)
    }
}

startServer()
