const Stripe = require("stripe")
const userModel = require("../models/user.model")

let _stripe = null
function getStripe() {
    if (!_stripe) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("STRIPE_SECRET_KEY is not configured")
        }
        _stripe = Stripe(process.env.STRIPE_SECRET_KEY)
    }
    return _stripe
}

/**
 * POST /api/payment/create-checkout
 * Creates a Stripe Checkout Session for the Pro plan.
 */
async function createCheckoutSession(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        // If user already has an active subscription, redirect to portal
        if (user.plan === "pro" && user.subscriptionStatus === "active") {
            return res.status(400).json({
                success: false,
                message: "You already have an active Pro subscription.",
            })
        }

        // Create or retrieve Stripe customer
        let customerId = user.stripeCustomerId
        if (!customerId) {
            const customer = await getStripe().customers.create({
                email: user.email,
                metadata: { userId: user._id.toString() },
            })
            customerId = customer.id
            await userModel.findByIdAndUpdate(user._id, { stripeCustomerId: customerId })
        }

        const session = await getStripe().checkout.sessions.create({
            customer: customerId,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: process.env.STRIPE_PRO_PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            metadata: { userId: user._id.toString() },
            allow_promotion_codes: true,
        })

        res.status(200).json({ success: true, url: session.url })
    } catch (error) {
        console.error("Stripe checkout error:", error.message)
        res.status(500).json({ success: false, message: "Failed to create checkout session" })
    }
}

/**
 * POST /api/payment/create-portal
 * Creates a Stripe Customer Portal session for managing billing.
 */
async function createPortalSession(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user || !user.stripeCustomerId) {
            return res.status(400).json({ success: false, message: "No billing account found" })
        }

        const session = await getStripe().billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${process.env.FRONTEND_URL}/profile`,
        })

        res.status(200).json({ success: true, url: session.url })
    } catch (error) {
        console.error("Portal error:", error.message)
        res.status(500).json({ success: false, message: "Failed to create billing portal" })
    }
}

/**
 * POST /api/payment/webhook
 * Handles Stripe webhook events to update user subscriptions.
 */
async function handleWebhook(req, res) {
    const sig = req.headers["stripe-signature"]
    let event

    try {
        event = getStripe().webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message)
        return res.status(400).json({ success: false, message: "Invalid signature" })
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object
                const userId = session.metadata?.userId
                if (userId) {
                    await userModel.findByIdAndUpdate(userId, {
                        plan: "pro",
                        stripeSubscriptionId: session.subscription,
                        subscriptionStatus: "active",
                        reportsUsedThisMonth: 0,
                    })
                }
                break
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object
                const status = subscription.status
                const customerId = subscription.customer
                const user = await userModel.findOne({ stripeCustomerId: customerId })
                if (user) {
                    await userModel.findByIdAndUpdate(user._id, {
                        subscriptionStatus: status,
                        stripeSubscriptionId: subscription.id,
                        plan: status === "active" || status === "trialing" ? "pro" : "starter",
                    })
                }
                break
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object
                const customerId = subscription.customer
                const user = await userModel.findOne({ stripeCustomerId: customerId })
                if (user) {
                    await userModel.findByIdAndUpdate(user._id, {
                        plan: "starter",
                        subscriptionStatus: "canceled",
                        stripeSubscriptionId: null,
                    })
                }
                break
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object
                const customerId = invoice.customer
                const user = await userModel.findOne({ stripeCustomerId: customerId })
                if (user) {
                    await userModel.findByIdAndUpdate(user._id, { subscriptionStatus: "past_due" })
                }
                break
            }
        }

        res.json({ received: true })
    } catch (error) {
        console.error("Webhook handler error:", error.message)
        res.status(500).json({ success: false, message: "Webhook processing failed" })
    }
}

/**
 * GET /api/payment/plan
 * Returns the current user's plan information.
 */
async function getPlanStatus(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select("plan stripeCustomerId subscriptionStatus reportsUsedThisMonth lastReportReset")
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        res.status(200).json({
            success: true,
            plan: user.plan,
            subscriptionStatus: user.subscriptionStatus,
            hasBillingAccount: !!user.stripeCustomerId,
            reportsUsedThisMonth: user.reportsUsedThisMonth,
        })
    } catch (error) {
        console.error("Plan status error:", error.message)
        res.status(500).json({ success: false, message: "Failed to fetch plan status" })
    }
}

module.exports = { createCheckoutSession, createPortalSession, handleWebhook, getPlanStatus }
