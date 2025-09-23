const express = require("express")
const { getAccessToRoute } = require("../Middlewares/Authorization/auth")
const {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getDashboardStats,
    adminDeleteStory,
    adminDeleteComment
} = require("../Controllers/admin")

const router = express.Router()

// All admin routes require authentication and admin role
router.use(getAccessToRoute)

// Check if user is admin
router.use((req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        })
    }
    next()
})

// Dashboard routes
router.get("/dashboard", getDashboardStats)

// User management routes
router.get("/users", getAllUsers)
router.get("/users/:userId", getUserById)
router.put("/users/:userId/role", updateUserRole)
router.delete("/users/:userId", deleteUser)

// Content management routes
router.delete("/stories/:slug", adminDeleteStory)
router.delete("/comments/:comment_id", adminDeleteComment)

module.exports = router

