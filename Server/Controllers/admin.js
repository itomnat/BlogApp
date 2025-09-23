const asyncErrorWrapper = require("express-async-handler")
const User = require("../Models/user")
const Story = require("../Models/story")
const Comment = require("../Models/comment")
const CustomError = require("../Helpers/error/CustomError")

// Get all users (admin only)
const getAllUsers = asyncErrorWrapper(async (req, res, next) => {
    const users = await User.find().select("-password").sort("-createdAt")
    
    return res.status(200).json({
        success: true,
        count: users.length,
        data: users
    })
})

// Get user by ID (admin only)
const getUserById = asyncErrorWrapper(async (req, res, next) => {
    const { userId } = req.params
    
    const user = await User.findById(userId).select("-password")
    
    if (!user) {
        return next(new CustomError("User not found", 404))
    }
    
    return res.status(200).json({
        success: true,
        data: user
    })
})

// Update user role (admin only)
const updateUserRole = asyncErrorWrapper(async (req, res, next) => {
    const { userId } = req.params
    const { role } = req.body
    
    if (!['user', 'admin'].includes(role)) {
        return next(new CustomError("Invalid role. Must be 'user' or 'admin'", 400))
    }
    
    const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
    ).select("-password")
    
    if (!user) {
        return next(new CustomError("User not found", 404))
    }
    
    return res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: user
    })
})

// Delete user (admin only)
const deleteUser = asyncErrorWrapper(async (req, res, next) => {
    const { userId } = req.params
    
    const user = await User.findById(userId)
    
    if (!user) {
        return next(new CustomError("User not found", 404))
    }
    
    // Delete all stories by this user
    await Story.deleteMany({ author: userId })
    
    // Delete all comments by this user
    await Comment.deleteMany({ author: userId })
    
    // Delete the user
    await User.findByIdAndDelete(userId)
    
    return res.status(200).json({
        success: true,
        message: "User and all associated data deleted successfully"
    })
})

// Get admin dashboard stats
const getDashboardStats = asyncErrorWrapper(async (req, res, next) => {
    const totalUsers = await User.countDocuments()
    const totalStories = await Story.countDocuments()
    const totalComments = await Comment.countDocuments()
    const adminUsers = await User.countDocuments({ role: 'admin' })
    
    // Get recent activity
    const recentStories = await Story.find()
        .populate('author', 'username')
        .sort('-createdAt')
        .limit(5)
    
    const recentComments = await Comment.find()
        .populate('author', 'username')
        .populate('story', 'title')
        .sort('-createdAt')
        .limit(5)
    
    return res.status(200).json({
        success: true,
        data: {
            stats: {
                totalUsers,
                totalStories,
                totalComments,
                adminUsers
            },
            recentActivity: {
                recentStories,
                recentComments
            }
        }
    })
})

// Admin delete any story
const adminDeleteStory = asyncErrorWrapper(async (req, res, next) => {
    const { slug } = req.params
    
    const story = await Story.findOne({ slug })
    
    if (!story) {
        return next(new CustomError("Story not found", 404))
    }
    
    // Delete associated comments
    await Comment.deleteMany({ story: story._id })
    
    // Delete the story
    await Story.findByIdAndDelete(story._id)
    
    return res.status(200).json({
        success: true,
        message: "Story and all associated comments deleted successfully"
    })
})

// Admin delete any comment
const adminDeleteComment = asyncErrorWrapper(async (req, res, next) => {
    const { comment_id } = req.params
    
    const comment = await Comment.findById(comment_id)
    
    if (!comment) {
        return next(new CustomError("Comment not found", 404))
    }
    
    // Remove comment from story's comments array
    const story = await Story.findById(comment.story)
    if (story) {
        story.comments = story.comments.filter(commentId => commentId.toString() !== comment_id)
        story.commentCount = story.comments.length
        await story.save()
    }
    
    await Comment.findByIdAndDelete(comment_id)
    
    return res.status(200).json({
        success: true,
        message: "Comment deleted successfully"
    })
})

module.exports = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getDashboardStats,
    adminDeleteStory,
    adminDeleteComment
}

