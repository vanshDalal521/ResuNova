const { Router } = require("express")
const { authUser, requireAdmin } = require("../middlewares/auth.middleware")
const {
    getAdminStatsController,
    getAdminUsersController,
    updateAdminUserController,
    deleteAdminUserController,
    getAdminReportsController,
    deleteAdminReportController,
} = require("../controllers/admin.controller")

const adminRouter = Router()

// All admin routes require authentication + admin role
adminRouter.use(authUser, requireAdmin)

adminRouter.get("/stats", getAdminStatsController)
adminRouter.get("/users", getAdminUsersController)
adminRouter.patch("/users/:userId", updateAdminUserController)
adminRouter.delete("/users/:userId", deleteAdminUserController)
adminRouter.get("/reports", getAdminReportsController)
adminRouter.delete("/reports/:reportId", deleteAdminReportController)

module.exports = adminRouter
