/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[${err.name || "Error"}] ${err.message}`)
    if (err.stack) {
        const lines = err.stack.split('\n')
        console.error(lines.slice(0, 8).join('\n'))
    }

    // Multer errors
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            success: false,
            message: "File size exceeds the 5MB limit",
        })
    }

    if (err.message?.includes("Only PDF and DOCX files are allowed")) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }

    // Payload too large
    if (err.type === "entity.too.large") {
        return res.status(413).json({
            success: false,
            message: "Request body is too large",
        })
    }

    // Mongoose validation errors
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation error",
        })
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Resource already exists",
        })
    }

    // Quota / rate-limit errors from AI service
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code || err.name || "RATE_LIMITED",
                message: err.message,
            },
        })
    }

    // Generic — never leak stack traces in production, but include error name
    const statusCode = 500
    res.status(statusCode).json({
        success: false,
        error: {
            code: err.name || "INTERNAL_ERROR",
            message: err.message || "Internal server error",
        },
    })
}

module.exports = errorHandler
