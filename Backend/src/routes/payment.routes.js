const { Router } = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const paymentController = require("../controllers/payment.controller")

const paymentRouter = Router()

paymentRouter.post("/create-checkout", authMiddleware.authUser, paymentController.createCheckoutSession)
paymentRouter.post("/create-portal", authMiddleware.authUser, paymentController.createPortalSession)
paymentRouter.get("/plan", authMiddleware.authUser, paymentController.getPlanStatus)

module.exports = paymentRouter
