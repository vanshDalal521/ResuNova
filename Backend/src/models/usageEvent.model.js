const mongoose = require("mongoose")

const usageEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        index: true,
    },
    type: {
        type: String,
        enum: ["PROFILE_ANALYSIS"],
        required: true,
    },
    status: {
        type: String,
        enum: ["RESERVED", "PROCESSING", "COMPLETED", "FAILED", "CANCELLED"],
        required: true,
        default: "RESERVED",
    },
    requestId: {
        type: String,
        required: true,
    },
    planAtTimeOfUsage: {
        type: String,
        enum: ["starter", "pro"],
        required: true,
    },
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewReport",
        default: null,
    },
    completedAt: {
        type: Date,
        default: null,
    },
    failedAt: {
        type: Date,
        default: null,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true })

usageEventSchema.index({ userId: 1, status: 1, createdAt: -1 })
usageEventSchema.index({ requestId: 1 }, { unique: true })

const usageEventModel = mongoose.model("UsageEvent", usageEventSchema)

module.exports = usageEventModel
