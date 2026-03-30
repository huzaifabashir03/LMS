# Backend - Smart Student Portal

## 📋 Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Environment Configuration](#environment-configuration)
6. [Database](#database)
7. [API Endpoints](#api-endpoints)
8. [Authentication & Security](#authentication--security)
9. [Controllers & Logic](#controllers--logic)
10. [Middleware](#middleware)
11. [Error Handling](#error-handling)
12. [Database Seeding](#database-seeding)
13. [Development](#development)
14. [Deployment](#deployment)
15. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The backend is a **Node.js/Express.js REST API** that handles all business logic, data management, and authentication for the Smart Student Portal. It provides secure endpoints for managing students, attendance, results, and courses.

### Key Highlights
- 🔒 **Secure**: JWT authentication with role-based access control
- ⚡ **Fast**: Express.js with efficient MongoDB queries
- 📦 **Scalable**: Modular architecture with controllers, routes, models
- 🛡️ **Protected**: Middleware-based security and validation
- 📊 **Robust**: Comprehensive error handling and logging

---

## 💻 Tech Stack

### Runtime & Framework
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for REST APIs
- **npm** - Package manager

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Document Mapper)

### Authentication & Security
- **JWT** - JSON Web Tokens for stateless authentication
- **bcryptjs** - Password hashing and verification
- **Helmet** - Security headers middleware
- **CORS** - Cross-Origin Resource Sharing

### Utilities
- **Morgan** - HTTP request logging
- **dotenv** - Environment variable management
- **Multer** - File upload handling (optional)
- **Nodemailer** - Email sending (optional)

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection setup
│
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── adminController.js       # Admin operations
│   ├── studentController.js     # Student operations
│   ├── attendanceController.js  # Attendance management
│   ├── resultController.js      # Results management
│   └── courseController.js      # Course management
│
├── models/
│   ├── User.js                  # User schema (student/admin)
│   ├── Attendance.js            # Attendance records
│   ├── Result.js                # Student results
│   ├── Course.js                # Course information
│   └── StudentCourse.js         # Student-Course enrollment
│
├── routes/
│   ├── authRoutes.js            # /api/auth endpoints
│   ├── adminRoutes.js           # /api/admin endpoints
│   ├── studentRoutes.js         # /api/student endpoints
│   ├── attendanceRoutes.js      # /api/attendance endpoints
│   ├── resultRoutes.js          # /api/results endpoints
│   └── courseRoutes.js          # /api/courses endpoints
│
├── middlewares/
│   ├── authMiddleware.js        # JWT token verification
│   └── roleMiddleware.js        # Admin role checking
│
├── seeder.js                    # Database seed script
├── server.js                    # Application entry point
├── package.json                 # Dependencies
├── .env                         # Environment variables
└── README.md                    # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create Environment File
```bash
# Create .env file
echo > .env

# Add these variables:
MONGO_URI=mongodb://localhost:27017/smart-student-portal
PORT=5000
JWT_SECRET=your-super-secret-key-min-32-characters
NODE_ENV=development
```

### Step 3: Verify MongoDB Connection
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud):
# Update MONGO_URI to your Atlas connection string
```

### Step 4: Seed Database
```bash
npm run seed
# Creates admin user and test data
```

### Step 5: Start Server
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

Server will run on: `http://localhost:5000`

### Available Scripts
```bash
npm start       # Start production server
npm run dev     # Start with nodemon (auto-reload)
npm run seed    # Populate database with test data
npm test        # Run tests (if configured)
```

---

## 🔐 Environment Configuration

### Required Variables
```bash
# Database
MONGO_URI=mongodb://localhost:27017/smart-student-portal

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your-secret-key-at-least-32-characters-long
```

### Optional Variables
```bash
# Email (if using email features)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# File Upload Size
MAX_FILE_SIZE=10mb

# CORS
ALLOWED_ORIGINS=http://localhost:5173
```

### Security Tips
- Never commit .env to version control
- Use strong JWT_SECRET (minimum 32 characters)
- Change default admin password in production
- Use environment-specific secrets
- Keep secrets in secure vaults (AWS, Azure, etc.)

---

## 💾 Database

### MongoDB Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  rollNo: String (unique),
  department: String,
  role: String (enum: ['student', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

#### Attendance Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: User),
  date: Date,
  status: String (enum: ['present', 'absent', 'leave']),
  createdAt: Date,
  updatedAt: Date
}
```

#### Results Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: User),
  subject: String,
  totalMarks: Number,
  obtainedMarks: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Courses Collection
```javascript
{
  _id: ObjectId,
  name: String,
  code: String,
  department: String,
  credits: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### StudentCourse Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  enrolledDate: Date,
  status: String (enum: ['active', 'completed', 'dropped']),
  createdAt: Date,
  updatedAt: Date
}
```

### Database Indexing
Mongoose automatically creates indexes on:
- `email` (unique)
- `rollNo` (unique)
- `studentId` (foreign key references)

---

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "rollNo": "CS001",
  "department": "Computer Science"
}

Response: 201
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": { name, email, role }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response: 200
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { name, email, role }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200
{
  "message": "User data",
  "user": { _id, name, email, role, rollNo }
}
```

### Student Endpoints (Protected)

#### Get Dashboard
```
GET /api/student/dashboard
Authorization: Bearer <token>
```

#### Get Personal Attendance
```
GET /api/student/attendance
Authorization: Bearer <token>
```

#### Get Personal Results
```
GET /api/student/results
Authorization: Bearer <token>
```

### Admin Endpoints (Protected + Admin Only)

#### List All Users
```
GET /api/admin/users
Authorization: Bearer <token>
```

#### Get All Attendance
```
GET /api/attendance
Authorization: Bearer <token>
```

#### Mark Attendance
```
POST /api/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "student": "CS001",
  "date": "2025-12-06",
  "status": "present"
}
```

#### Update Attendance
```
PUT /api/attendance/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2025-12-06",
  "status": "absent"
}
```

#### Delete Attendance
```
DELETE /api/attendance/:id
Authorization: Bearer <token>
```

#### Similar endpoints exist for:
- `/api/results` - Results CRUD
- `/api/courses` - Courses CRUD

---

## 🔒 Authentication & Security

### JWT Authentication Flow
```javascript
// 1. User logs in
POST /api/auth/login
→ Verify email/password
→ Generate JWT token
→ Return token to client

// 2. Client stores token
localStorage.setItem('token', token)

// 3. Client sends token with requests
GET /api/student/dashboard
Headers: Authorization: Bearer <token>

// 4. Server verifies token
authMiddleware → jwt.verify(token)
→ Decode user ID
→ Attach user to request

// 5. Process request
return user data
```

### Password Security
```javascript
// Registration
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)
// Store hashedPassword in database

// Login
const isMatch = await bcrypt.compare(password, user.password)
// Compare hashed password
```

### Role-Based Access Control
```javascript
// Admin routes
router.get('/', protect, adminOnly, controller.getAllAttendance)

// protect middleware → Verify JWT
// adminOnly middleware → Check user.role === 'admin'

// Student routes
router.get('/student/dashboard', protect, controller.getDashboard)
// Only requires authentication, any role allowed
```

### Security Headers
```javascript
// Helmet provides:
app.use(helmet())
// Prevents MIME type sniffing
// Sets X-Frame-Options
// Enables HTTPS enforcement
// And many more security headers
```

---

## 🎮 Controllers & Logic

### Controller Structure
```javascript
// Example: attendanceController.js

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { student, date, status } = req.body
    
    // Validate input
    if (!student || !date || !status) {
      return res.status(400).json({ 
        message: 'All fields required' 
      })
    }
    
    // Find student
    const user = await User.findOne({ rollNo: student })
    if (!user) {
      return res.status(404).json({ 
        message: 'Student not found' 
      })
    }
    
    // Create record
    const attendance = new Attendance({
      studentId: user._id,
      date,
      status
    })
    await attendance.save()
    
    // Return success
    return res.status(201).json({
      message: 'Attendance marked successfully',
      attendance
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error marking attendance',
      error: error.message
    })
  }
}
```

### Get All Records
```javascript
const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('studentId', 'name rollNo email department')
    
    return res.status(200).json(records)
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving records',
      error: error.message
    })
  }
}
```

### Update Record
```javascript
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Attendance.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!updated) {
      return res.status(404).json({
        message: 'Record not found'
      })
    }
    
    return res.status(200).json({
      message: 'Updated successfully',
      updated
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating record',
      error: error.message
    })
  }
}
```

---

## 🔧 Middleware

### Authentication Middleware
```javascript
// authMiddleware.js
export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, no token'
      })
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Get user from token
    req.user = await User.findById(decoded.id).select('-password')
    
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized, token failed'
    })
  }
}
```

### Role Middleware
```javascript
// roleMiddleware.js
export const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next()
  } else {
    res.status(403).json({
      message: 'Admin access only'
    })
  }
}
```

### Logging Middleware
```javascript
// Applied globally
app.use(morgan('dev'))
// Logs all HTTP requests to console
// Example: GET /api/student/dashboard 200 - 45.234 ms
```

---

## ❌ Error Handling

### Error Response Format
```javascript
// Success Response
res.status(200).json({
  message: 'Operation successful',
  data: { ... }
})

// Error Response
res.status(400).json({
  message: 'Validation failed',
  error: 'Email is required'
})

// Server Error
res.status(500).json({
  message: 'Internal server error',
  error: error.message
})
```

### Common Status Codes
- **200** - OK (success)
- **201** - Created (resource created)
- **400** - Bad Request (validation error)
- **401** - Unauthorized (no token/invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error

### Try-Catch Pattern
```javascript
const controller = async (req, res) => {
  try {
    // Process request
    const result = await someAsync()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      message: 'Error message',
      error: error.message
    })
  }
}
```

---

## 🌱 Database Seeding

### Seeder Script
```bash
npm run seed
```

### What Gets Seeded
1. **Admin User**
   - Email: admin@example.com
   - Password: admin123
   - Role: admin

2. **Student Users**
   - John Doe (CS001)
   - Jane Smith (CS002)
   - Bob Wilson (CS003)
   - Password: student123 (all)

3. **Attendance Records**
   - 9 sample records across students
   - Various dates and statuses

### Seeder Code
```javascript
// seeder.js
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    rollNo: 'A001',
    department: 'Admin',
    role: 'admin'
  },
  // ... student data
]

const importData = async () => {
  try {
    // Hash passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10)
        return {
          ...user,
          password: await bcrypt.hash(user.password, salt)
        }
      })
    )
    
    // Insert users
    await User.insertMany(hashedUsers)
    
    // Insert other data
    // ...
    
    console.log('Data seeded successfully!')
  } catch (error) {
    console.error('Seeding error:', error)
  }
}
```

---

## 🔧 Development

### Code Organization
```javascript
// Good structure
const authController = async (req, res) => {
  try {
    // 1. Validate input
    if (!email) return res.status(400).json({ ... })
    
    // 2. Check if user exists
    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ ... })
    
    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // 4. Create record
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()
    
    // 5. Return success
    res.status(201).json({ message: 'Success', user: newUser })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

### Adding New Endpoints
1. Create controller method in `/controllers`
2. Create route in `/routes`
3. Register route in `server.js`
4. Test with Postman/Thunder Client

### Testing Endpoints
```bash
# Install REST client
npm install -g thunder-client

# Or use Postman
# https://www.postman.com

# Or use curl
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer <token>"
```

---

## 🚢 Deployment

### Prepare for Production
```bash
# Update .env
NODE_ENV=production
JWT_SECRET=<secure-random-string>
MONGO_URI=<production-mongodb-url>
```

### Deploy to Heroku
```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create app-name

# Set environment variables
heroku config:set JWT_SECRET=<secret>
heroku config:set MONGO_URI=<uri>

# Deploy
git push heroku main
```

### Deploy to Railway
```bash
# Connect GitHub repo
# Add environment variables in dashboard
# Deploy automatically on push
```

### Deploy to Render
```bash
# Create account at render.com
# Connect GitHub repo
# Set environment variables
# Deploy
```

### Monitor Production
```javascript
// Add error tracking
import Sentry from '@sentry/node'
Sentry.init({ dsn: process.env.SENTRY_DSN })

// Add monitoring
app.use(requestLogger)
```

---

## 🔍 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
1. Verify MongoDB is running: `mongod`
2. Check MONGO_URI in .env
3. Test connection string in MongoDB Compass
4. Check username/password for Atlas
5. Verify firewall allows MongoDB port

### Issue: "JWT verification failed"
**Solution:**
1. Verify JWT_SECRET is set in .env
2. Check token format: "Bearer <token>"
3. Verify token hasn't expired
4. Check token is being sent in headers
5. Clear localStorage and re-login

### Issue: "Admin route returns 403 Forbidden"
**Solution:**
1. Verify user has admin role
2. Check token is valid and current
3. Verify roleMiddleware is applied
4. Check user object in req.user
5. Re-seed database for test data

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

### Issue: "CORS error when accessing from frontend"
**Solution:**
1. Check CORS is enabled in server.js
2. Verify frontend URL in CORS config
3. Check API_URL in frontend .env
4. Test with Postman first
5. Check browser console for exact error

### Debug Mode
```javascript
// In server.js
if (process.env.DEBUG) {
  console.log('Request:', req.body)
  console.log('User:', req.user)
  console.log('Query result:', result)
}

// Enable debugging
DEBUG=true npm run dev
```

---

## 📞 Support

For issues or questions:
1. Check logs: `npm run dev` (shows errors)
2. Verify .env configuration
3. Test endpoints with Postman
4. Check MongoDB connection
5. Review troubleshooting section above
6. Check main README.md

---

## 🎉 Conclusion

The backend provides a robust, secure REST API for the Smart Student Portal. It handles authentication, data management, and business logic efficiently.

Happy coding! 🚀
