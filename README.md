# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. This application provides a complete blogging platform with user authentication, CRUD operations for blog posts, commenting system, and admin dashboard.

## 🚀 Features

### User Authentication
- ✅ User registration with email, username, and password
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Password reset functionality via email
- ✅ Protected routes and authorization

### Blog Post Management
- ✅ Create, Read, Update, Delete (CRUD) operations for blog posts
- ✅ Rich text editor with CKEditor
- ✅ Image upload for blog posts
- ✅ Slug-based URLs for SEO-friendly links
- ✅ Reading time calculation
- ✅ Like functionality for posts
- ✅ Author information and creation dates

### Commenting System
- ✅ Add comments to blog posts
- ✅ Star rating system for comments
- ✅ Like functionality for comments
- ✅ Comment management and moderation

### Admin Dashboard
- ✅ Admin-only access to dashboard
- ✅ User management (view, update roles, delete users)
- ✅ Content management (delete any posts/comments)
- ✅ Dashboard statistics and analytics
- ✅ Recent activity monitoring

### Additional Features
- ✅ Responsive design for all devices
- ✅ Search functionality
- ✅ Pagination for posts
- ✅ User profiles with photo upload
- ✅ Read list/bookmark functionality
- ✅ Error handling and validation
- ✅ Loading states and skeletons

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CKEditor** - Rich text editor
- **React Icons** - Icon library
- **CSS3** - Styling

## 📁 Project Structure

```
blog-app/
├── Server/                    # Backend
│   ├── Controllers/           # Route controllers
│   │   ├── auth.js           # Authentication controller
│   │   ├── story.js          # Blog post controller
│   │   ├── comment.js        # Comment controller
│   │   ├── user.js           # User controller
│   │   └── admin.js          # Admin controller
│   ├── Models/               # Database models
│   │   ├── user.js           # User model
│   │   ├── story.js          # Blog post model
│   │   └── comment.js        # Comment model
│   ├── Middlewares/          # Custom middlewares
│   │   ├── Authorization/    # Auth middleware
│   │   ├── Errors/          # Error handling
│   │   └── database/        # Database middleware
│   ├── Routers/             # API routes
│   │   ├── auth.js          # Auth routes
│   │   ├── story.js         # Story routes
│   │   ├── comment.js       # Comment routes
│   │   ├── user.js          # User routes
│   │   ├── admin.js         # Admin routes
│   │   └── index.js         # Main router
│   ├── Helpers/             # Utility functions
│   │   ├── auth/            # Auth helpers
│   │   ├── database/        # Database helpers
│   │   ├── error/           # Error helpers
│   │   ├── input/           # Input validation
│   │   ├── Libraries/       # External libraries
│   │   └── query/           # Query helpers
│   ├── public/              # Static files
│   │   ├── storyImages/     # Blog post images
│   │   └── userPhotos/      # User profile photos
│   ├── server.js            # Main server file
│   ├── package.json         # Dependencies
│   └── env.example          # Environment variables template
│
├── client/                   # Frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AdminScreens/    # Admin dashboard
│   │   │   ├── AuthScreens/     # Authentication screens
│   │   │   ├── CommentScreens/  # Comment components
│   │   │   ├── GeneralScreens/  # General components
│   │   │   ├── ProfileScreens/ # Profile components
│   │   │   ├── Routing/         # Route components
│   │   │   ├── Skeletons/       # Loading skeletons
│   │   │   └── StoryScreens/    # Blog post components
│   │   ├── Context/         # React context
│   │   ├── Css/             # Stylesheets
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── package.json         # Dependencies
│   └── .env.example         # Environment variables template
│
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd blog-app
   ```

2. **Install backend dependencies**
   ```bash
   cd Server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   **Backend (Server/.env):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET_KEY=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   EMAIL_USERNAME=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   PORT=5000
   NODE_ENV=development
   URI=http://localhost:3000
   RESET_PASSWORD_EXPIRE=3600000
   ```

   **Frontend (client/.env):**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Start the development servers**

   **Backend:**
   ```bash
   cd Server
   npm run dev
   ```

   **Frontend (in a new terminal):**
   ```bash
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/forgotpassword` - Request password reset
- `POST /auth/resetpassword` - Reset password

### Story (Blog Post) Endpoints
- `GET /story` - Get all stories
- `POST /story/addStory` - Create new story (protected)
- `GET /story/:slug` - Get story by slug
- `PUT /story/:slug/edit` - Update story (protected)
- `DELETE /story/:slug/delete` - Delete story (protected)
- `POST /story/:slug/like` - Like/unlike story (protected)

### Comment Endpoints
- `GET /comment/:slug/getAllComment` - Get all comments for a story
- `POST /comment/:slug/addComment` - Add comment (protected)
- `POST /comment/:comment_id/like` - Like/unlike comment (protected)
- `DELETE /comment/:comment_id` - Delete comment (protected)

### User Endpoints
- `GET /user/profile` - Get user profile (protected)
- `PUT /user/editProfile` - Update profile (protected)
- `PUT /user/changePassword` - Change password (protected)

### Admin Endpoints (Admin only)
- `GET /admin/dashboard` - Get dashboard statistics
- `GET /admin/users` - Get all users
- `GET /admin/users/:userId` - Get user by ID
- `PUT /admin/users/:userId/role` - Update user role
- `DELETE /admin/users/:userId` - Delete user
- `DELETE /admin/stories/:slug` - Delete any story
- `DELETE /admin/comments/:comment_id` - Delete any comment

## 🔐 User Roles

### Regular User
- Create, edit, and delete their own blog posts
- Comment on any blog post
- Like posts and comments
- Manage their profile
- View all public content

### Admin User
- All regular user permissions
- Access to admin dashboard
- Delete any blog post
- Delete any comment
- Manage user roles
- View system statistics

admin credentials for testing:

email: badong@mail.com
password: 123456789

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean and intuitive interface
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation
- **Rich Text Editor**: CKEditor for blog post creation
- **Image Upload**: Support for blog post and profile images

## 🚀 Deployment

This application is designed to be deployed on:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## 🧪 Testing

To test the application:

1. **Register a new user**
2. **Create a blog post**
3. **Add comments**
4. **Test admin functionality** (create admin user in database)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nataniel Cristoher Itom**

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Vercel for frontend hosting
- Render for backend hosting
- All open-source libraries used in this project

## 📞 Support

If you have any questions or need help with deployment, please:
1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Open an issue in the repository
3. Contact the author

---

**Happy Blogging! 🎉**




