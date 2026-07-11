const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required to be added in blacklist"],
        index: true,
    }
}, {
    timestamps: true,
})

// Auto-delete blacklisted tokens after 7 days (JWT is valid for 1 day, 7 is safe)
blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 })

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = tokenBlacklistModel
