const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const storyRoute = require("./story")
const userRoute = require("./user")
const commentRoute = require("./comment")
const adminRoute = require("./admin")

router.use("/auth",authRoute)
router.use("/story",storyRoute)
router.use("/user",userRoute)
router.use("/comment",commentRoute)
router.use("/admin",adminRoute)

// Health check endpoint
router.get("/health", (req, res) => {
    const envCheck = {
        MONGODB_URI: !!process.env.MONGODB_URI,
        JWT_SECRET_KEY: !!process.env.JWT_SECRET_KEY,
        EMAIL_USERNAME: !!process.env.EMAIL_USERNAME,
        URI: !!process.env.URI
    };
    
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT
        },
        envVars: envCheck
    })
})

module.exports = router