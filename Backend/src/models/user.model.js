const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already taken"],
        required: true,
    },
    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        enum: ["starter", "pro"],
        default: "starter",
    },
    stripeCustomerId: {
        type: String,
        default: null,
    },
    stripeSubscriptionId: {
        type: String,
        default: null,
    },
    subscriptionStatus: {
        type: String,
        enum: ["active", "past_due", "canceled", "incomplete", "incomplete_expired", "trialing", "unpaid", null],
        default: null,
    },
    reportsUsedThisMonth: {
        type: Number,
        default: 0,
    },
    lastReportReset: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
