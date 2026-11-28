const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

let adminSeeded = false

/**
 * Ensures the configured admin account exists in MongoDB with full Pro + Admin
 * privileges. Provisioning is opt-in and only runs when ADMIN_USERNAME,
 * ADMIN_EMAIL, and ADMIN_PASSWORD are all set. Existing non-admin accounts are
 * never promoted automatically.
 *
 * Idempotent and safe to run on server startup or serverless cold start.
 */
async function ensureAdminUser() {
    if (adminSeeded) return

    if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.warn(
            "[Admin Seed] Skipped: set ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD to provision an admin account."
        )
        adminSeeded = true
        return
    }

    try {
        const existing = await userModel.findOne({ email: ADMIN_EMAIL.toLowerCase() })

        if (!existing) {
            const hash = await bcrypt.hash(ADMIN_PASSWORD, 12)
            await userModel.create({
                username: ADMIN_USERNAME,
                email: ADMIN_EMAIL.toLowerCase(),
                password: hash,
                role: "admin",
                plan: "pro",
                subscriptionStatus: "active",
            })
            console.log(`[Admin Seed] Created admin user "${ADMIN_USERNAME}"`)
        } else if (existing.role !== "admin") {
            console.warn(
                `[Admin Seed] Account "${ADMIN_EMAIL}" already exists but is not an admin. Refusing to promote it automatically.`
            )
        } else {
            let needsSave = false
            if (existing.plan !== "pro") {
                existing.plan = "pro"
                needsSave = true
            }
            if (existing.subscriptionStatus !== "active") {
                existing.subscriptionStatus = "active"
                needsSave = true
            }
            if (needsSave) {
                await existing.save()
                console.log(`[Admin Seed] Synced admin privileges for "${existing.username}"`)
            }
        }
        adminSeeded = true
    } catch (err) {
        console.error("[Admin Seed] Failed to ensure admin user:", err.message)
    }
}

module.exports = { ensureAdminUser }
