import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import { useAuth } from '../../Context/AuthContext'
import '../../Css/AdminDashboard.css'

const AdminDashboard = () => {
    const { activeUser } = useAuth()
    const [stats, setStats] = useState(null)
    const [users, setUsers] = useState([])
    const [stories, setStories] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('dashboard')

    useEffect(() => {
        if (activeUser && activeUser.role === 'admin') {
            fetchDashboardData()
        }
    }, [activeUser])

    const fetchDashboardData = async () => {
        try {
            const [statsRes, usersRes] = await Promise.all([
                api.get('/admin/dashboard'),
                api.get('/admin/users')
            ])

            setStats(statsRes.data.data)
            setUsers(usersRes.data.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
            setLoading(false)
        }
    }

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user and all their data?')) {
            try {
                await api.delete(`/admin/users/${userId}`)
                setUsers(users.filter(u => u._id !== userId))
                alert('User deleted successfully')
            } catch (error) {
                console.error('Error deleting user:', error)
                alert('Error deleting user')
            }
        }
    }

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            await api.put(`/admin/users/${userId}/role`, { role: newRole })
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u))
            alert('User role updated successfully')
        } catch (error) {
            console.error('Error updating user role:', error)
            alert('Error updating user role')
        }
    }

    const handleDeleteStory = async (slug) => {
        if (window.confirm('Are you sure you want to delete this story?')) {
            try {
                await api.delete(`/admin/stories/${slug}`)
                alert('Story deleted successfully')
                fetchDashboardData() // Refresh data
            } catch (error) {
                console.error('Error deleting story:', error)
                alert('Error deleting story')
            }
        }
    }

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await api.delete(`/admin/comments/${commentId}`)
                alert('Comment deleted successfully')
                fetchDashboardData() // Refresh data
            } catch (error) {
                console.error('Error deleting comment:', error)
                alert('Error deleting comment')
            }
        }
    }

    if (!activeUser || activeUser.role !== 'admin') {
        return (
            <div className="admin-dashboard">
                <div className="access-denied">
                    <h2>Access Denied</h2>
                    <p>You need admin privileges to access this page.</p>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="loading">Loading dashboard...</div>
            </div>
        )
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome, {activeUser.username}</p>
            </div>

            <div className="admin-tabs">
                <button 
                    className={activeTab === 'dashboard' ? 'active' : ''}
                    onClick={() => setActiveTab('dashboard')}
                >
                    Dashboard
                </button>
                <button 
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button 
                    className={activeTab === 'content' ? 'active' : ''}
                    onClick={() => setActiveTab('content')}
                >
                    Content
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'dashboard' && stats && (
                    <div className="dashboard-stats">
                        <h2>Statistics</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Users</h3>
                                <p>{stats.stats.totalUsers}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Stories</h3>
                                <p>{stats.stats.totalStories}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Comments</h3>
                                <p>{stats.stats.totalComments}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Admin Users</h3>
                                <p>{stats.stats.adminUsers}</p>
                            </div>
                        </div>

                        <div className="recent-activity">
                            <h3>Recent Stories</h3>
                            <div className="activity-list">
                                {stats.recentActivity.recentStories.map(story => (
                                    <div key={story._id} className="activity-item">
                                        <h4>{story.title}</h4>
                                        <p>By {story.author.username}</p>
                                        <p>{new Date(story.createdAt).toLocaleDateString()}</p>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDeleteStory(story.slug)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="recent-activity">
                            <h3>Recent Comments</h3>
                            <div className="activity-list">
                                {stats.recentActivity.recentComments.map(comment => (
                                    <div key={comment._id} className="activity-item">
                                        <h4>{comment.story.title}</h4>
                                        <p>{comment.content.substring(0, 100)}...</p>
                                        <p>By {comment.author.username}</p>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDeleteComment(comment._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="users-management">
                        <h2>User Management</h2>
                        <div className="users-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <select 
                                                    value={user.role}
                                                    onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button 
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="content-management">
                        <h2>Content Management</h2>
                        <p>Use the dashboard tab to manage recent stories and comments.</p>
                        <p>For full content management, you can also use the regular story and comment pages.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard


