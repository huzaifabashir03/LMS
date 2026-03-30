# Frontend - Smart Student Portal

## 📋 Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Features](#features)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Styling & Design System](#styling--design-system)
10. [Routing](#routing)
11. [Development](#development)
12. [Build & Deployment](#build--deployment)
13. [Troubleshooting](#troubleshooting)


## 🎯 Overview

The frontend is a **React.js application** built with **Vite** that provides a modern, responsive UI for the Smart Student Portal. It handles user authentication, role-based access control, and provides separate dashboards for students and administrators.

### Key Highlights
- ⚡ **Fast**: Built with Vite for instant HMR (Hot Module Reload)
- 🎨 **Beautiful**: Professional design with dark/light theme toggle
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile
- 🔒 **Secure**: JWT-based authentication with protected routes
- 🌙 **Modern**: Smooth animations, gradient buttons, professional styling

---

## 💻 Tech Stack

### Core Framework
- **React 18+** - UI library with hooks
- **React Router v6** - Client-side routing
- **Vite** - Next-gen frontend build tool
- **Axios** - HTTP client for API communication

### State Management
- **Context API** - Authentication & Theme state
- **React Hooks** - Local component state (useState, useEffect, useContext)

### Styling
- **CSS3** - Modern CSS with variables and Grid/Flexbox
- **Custom CSS System** - 10+ modular stylesheets
- **CSS Variables** - Dynamic theming support

### Development Tools
- **npm** - Package manager
- **ESLint** - Code quality
- **Vite Config** - Build configuration

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── api.js                    # Axios instance & API calls
│   │
│   ├── components/
│   │   ├── Header.jsx                # Navigation header with theme toggle
│   │   ├── Footer.jsx                # Footer component
│   │   ├── PrivateRoute.jsx          # Protect student routes
│   │   └── AdminRoute.jsx            # Protect admin routes
│   │
│   ├── context/
│   │   ├── AuthContext.jsx           # Authentication state
│   │   ├── ThemeContext.jsx          # Theme toggle logic
│   │   └── ThemeContextValue.js      # Theme context definition
│   │
│   ├── pages/
│   │   ├── Home.jsx                  # Landing page
│   │   ├── Login.jsx                 # Login form
│   │   ├── Signup.jsx                # Registration form
│   │   ├── StudentDashboard.jsx      # Student home dashboard
│   │   ├── AdminDashboard.jsx        # Admin home dashboard
│   │   ├── StudentsList.jsx          # View all students (admin)
│   │   ├── AddStudent.jsx            # Add student form (admin)
│   │   ├── Attendance.jsx            # View personal attendance (student)
│   │   ├── MarkAttendance.jsx        # Mark attendance form (admin)
│   │   ├── ManageAttendance.jsx      # Edit/delete attendance (admin)
│   │   ├── Results.jsx               # View personal results (student)
│   │   ├── UploadResult.jsx          # Upload results form (admin)
│   │   ├── ManageResults.jsx         # Edit/delete results (admin)
│   │   ├── MyCourses.jsx             # View enrolled courses (student)
│   │   ├── AssignCourse.jsx          # Assign courses form (admin)
│   │   └── ManageCourses.jsx         # Manage courses (admin)
│   │
│   ├── styles/
│   │   ├── variables.css             # CSS variables & themes
│   │   ├── typography.css            # Fonts & text styles
│   │   ├── header.css                # Navigation styles
│   │   ├── footer.css                # Footer styles
│   │   ├── forms.css                 # Inputs & buttons
│   │   ├── cards.css                 # Card components
│   │   ├── tables.css                # Table styling
│   │   ├── dashboard.css             # Dashboard layout
│   │   ├── messages.css              # Alerts & notifications
│   │   ├── students-list.css         # Students page styling
│   │   ├── responsive.css            # Responsive utilities
│   │   └── main.css                  # Master stylesheet
│   │
│   ├── App.jsx                       # Main app component
│   └── main.jsx                      # React entry point
│
├── public/                           # Static assets
├── index.html                        # HTML entry point
├── package.json                      # Dependencies
├── vite.config.js                    # Vite configuration
├── eslint.config.js                  # ESLint configuration
└── README.md                         # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Create Environment File (Optional)
```bash
# Create .env file
echo VITE_API_URL=http://localhost:5000/api > .env

# Or manually create .env with:
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Server
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Available Scripts
```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality with ESLint
```

---

## ✨ Features

### 🔐 Authentication
- User registration (signup) with validation
- User login with JWT token
- Token storage in localStorage
- Automatic logout on token expiry
- Session persistence on page refresh

### 👥 User Roles
- **Admin**: Full access to manage students, attendance, results, courses
- **Student**: Access to personal data, attendance, results, courses

### 👨‍💼 Admin Features
1. **Student Management**
   - View all students in responsive table
   - Search by name, email, roll number, department
   - Add new students
   - Copy student info to clipboard

2. **Attendance Management**
   - Mark attendance for students
   - View all attendance records
   - Edit attendance details
   - Delete attendance records
   - Filter and search attendance

3. **Result Management**
   - Upload/add student results
   - View all results
   - Edit result details
   - Delete result records

4. **Course Management**
   - Create and manage courses
   - Assign courses to students
   - View all course assignments

### 👨‍🎓 Student Features
1. **Dashboard** - Personal profile and quick stats
2. **Attendance** - View personal attendance records
3. **Results** - View academic performance
4. **Courses** - View enrolled courses

### 🎨 UI/UX Features
- **Dark/Light Theme Toggle** - Persistent theme preference
- **Responsive Design** - Mobile, tablet, desktop views
- **Professional Styling** - Gradient buttons, smooth animations
- **Error Handling** - User-friendly error messages
- **Loading States** - Loading spinners and placeholders
- **Empty States** - Helpful messages when no data
- **Search & Filter** - Quick data filtering
- **Statistics Display** - Cards showing key metrics

---

## 🏗️ Component Architecture

### Route Structure
```
/
├── (public)
│   ├── /          → Home.jsx
│   ├── /login     → Login.jsx
│   └── /signup    → Signup.jsx
│
├── (protected student)
│   ├── /student-dashboard      → StudentDashboard.jsx
│   ├── /attendance             → Attendance.jsx
│   ├── /results                → Results.jsx
│   └── /my-courses             → MyCourses.jsx
│
└── (protected admin)
    ├── /admin-dashboard        → AdminDashboard.jsx
    ├── /students-list          → StudentsList.jsx
    ├── /add-student            → AddStudent.jsx
    ├── /mark-attendance        → MarkAttendance.jsx
    ├── /manage-attendance      → ManageAttendance.jsx
    ├── /upload-result          → UploadResult.jsx
    ├── /manage-results         → ManageResults.jsx
    ├── /assign-course          → AssignCourse.jsx
    └── /manage-courses         → ManageCourses.jsx
```

### Component Hierarchy
```
App
├── ThemeProvider
│   └── AuthProvider
│       └── Router
│           ├── Header (all pages)
│           ├── Routes
│           │   ├── Public Routes
│           │   ├── PrivateRoute
│           │   │   └── Student Pages
│           │   └── AdminRoute
│           │       └── Admin Pages
│           └── Footer (all pages)
```

---

## 🔄 State Management

### Authentication Context
```javascript
const { user, login, logout, isAuthenticated } = useContext(AuthContext)

// user = { name, email, role, id }
// login(email, password) → authenticate user
// logout() → clear auth state
// isAuthenticated → boolean flag
```

### Theme Context
```javascript
const { isDark, toggleTheme } = useContext(ThemeContext)

// isDark → true for dark mode, false for light
// toggleTheme() → toggle between light/dark
// Persisted in localStorage as 'theme'
```

### Local Component State
```javascript
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
```

---

## 📡 API Integration

### Axios Instance Setup
```javascript
// api.js - configured with:
// - Base URL from VITE_API_URL env variable
// - Authorization header with JWT token
// - Request/response interceptors
```

### API Calls
```javascript
import { getAllAttendance, updateAttendance } from '../api/api'

// GET request with auth
const { data } = await getAllAttendance()

// PUT request with data
await updateAttendance(id, { status: 'present' })

// Error handling
try {
  const response = await apiCall()
} catch (err) {
  const errorMsg = err.response?.data?.message
}
```

### Available API Functions
```javascript
// Auth
register(data)           // POST /auth/signup
login(data)              // POST /auth/login
getMe()                  // GET /auth/me

// Student
getDashboard()           // GET /student/dashboard
getAttendance()          // GET /student/attendance
getResults()             // GET /student/results

// Admin
listUsers()              // GET /admin/users
getAllAttendance()       // GET /attendance
addAttendance(data)      // POST /attendance
updateAttendance(id, data) // PUT /attendance/:id
deleteAttendance(id)     // DELETE /attendance/:id
// ... similar for results, courses
```

---

## 🎨 Styling & Design System

### CSS Architecture
- **Main File**: `main.css` imports all stylesheets
- **Variables**: `variables.css` defines colors, spacing, fonts
- **Modular**: Each component has dedicated stylesheet
- **Responsive**: `responsive.css` handles breakpoints
- **Utilities**: Helper classes for common patterns

### Color System (Light Mode)
```css
--primary-color: #5b7cff (blue)
--secondary-color: #00d4ff (cyan)
--success-color: #10b981 (green)
--error-color: #ef4444 (red)
--warning-color: #f59e0b (amber)
```

### Dark Mode
- Automatic color switching via `[data-theme="dark"]`
- All colors adjust for readability
- Smooth 300ms transitions
- Persisted in localStorage

### Responsive Breakpoints
```css
Desktop      (1200px+)   → Full layout
Tablet       (768-1199px) → Adjusted spacing
Mobile       (480-767px)  → Single column
Small Mobile (<480px)     → Compact view
```

### Component Styling Examples
```jsx
// Button with variant
<button className="btn btn-primary">Submit</button>
<button className="btn btn-danger btn-small">Delete</button>

// Card component
<div className="card">
  <div className="card-header"><h3>Title</h3></div>
  <div className="card-body">Content</div>
</div>

// Alert message
<div className="success">Success message</div>
<div className="error">Error message</div>
```

---

## 🧭 Routing

### Public Routes
```javascript
/              Home page
/login         Login form
/signup        Registration form
```

### Student Protected Routes
```javascript
/student-dashboard      Student home
/attendance             View attendance
/results               View results
/my-courses            View courses
```

### Admin Protected Routes
```javascript
/admin-dashboard       Admin home
/students-list         All students
/add-student          Add new student
/mark-attendance      Mark attendance
/manage-attendance    Manage records
/upload-result        Upload results
/manage-results       Manage results
/assign-course        Assign courses
/manage-courses       Manage courses
```

### Route Protection
```javascript
// PrivateRoute - requires authentication
<Route element={<PrivateRoute><StudentPage /></PrivateRoute>} />

// AdminRoute - requires admin role
<Route element={<AdminRoute><AdminPage /></AdminRoute>} />
```

---

## 🔧 Development

### Code Style
- Functional components with React Hooks
- Props destructuring
- Context for global state
- Error handling in try-catch blocks

### Example Component
```jsx
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getAttendance } from '../api/api'

const AttendancePage = () => {
  const { user } = useContext(AuthContext)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAttendance()
        setRecords(data)
      } catch (err) {
        setError(err.response?.data?.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="page">
      <h2>Attendance Records</h2>
      {/* Content */}
    </div>
  )
}

export default AttendancePage
```

### Common Patterns
```javascript
// Conditional rendering
{condition ? <ComponentA /> : <ComponentB />}

// List rendering
{items.map(item => <Item key={item.id} {...item} />)}

// Form handling
const [formData, setFormData] = useState({})
const handleChange = (e) => setFormData({
  ...formData,
  [e.target.name]: e.target.value
})

// Error handling
try {
  await apiCall()
} catch (err) {
  setError(err.response?.data?.message || 'Error')
}
```

---

## 🏗️ Build & Deployment

### Production Build
```bash
npm run build
# Creates optimized build in dist/ folder
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add VITE_API_URL
```

### Deploy to Netlify
```bash
# Via CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist

# Or connect GitHub repository to Netlify dashboard
```

### Environment Setup for Production
```bash
VITE_API_URL=https://your-backend-domain.com/api
```

### Build Output
```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── *.js           # Bundled JavaScript
│   └── *.css          # Bundled CSS
└── favicon.ico        # Favicon
```

---

## 🔍 Troubleshooting

### Issue: "Failed to load API"
**Solution:**
1. Check backend server is running
2. Verify VITE_API_URL in .env
3. Check browser console for CORS errors
4. Verify backend CORS is enabled

### Issue: "Login not working"
**Solution:**
1. Clear localStorage and cache
2. Check credentials are correct
3. Verify backend auth endpoints working
4. Check browser console for token errors

### Issue: "Theme toggle not working"
**Solution:**
1. Check ThemeContext is imported
2. Verify ThemeProvider wraps App
3. Check CSS variables in variables.css
4. Inspect element for data-theme attribute

### Issue: "Page is blank / white screen"
**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Verify all imports are correct
4. Check network tab for failed requests
5. Try clearing browser cache

### Issue: "Mobile layout broken"
**Solution:**
1. Check viewport meta tag in index.html
2. Verify responsive CSS is loaded
3. Test with different viewport sizes
4. Check mobile breakpoints in responsive.css

### Debug Mode
```javascript
// In browser console
localStorage.setItem('debug', 'true')

// In api.js
console.log('Request:', config)
console.log('Response:', response)
```

---

## 📚 Best Practices

### Component Organization
- One component per file
- Consistent naming (PascalCase for components)
- Props destructuring
- Proper key prop for lists

### State Management
- Use Context for global state only
- Use local useState for component state
- Avoid prop drilling
- Keep state as high as needed

### Error Handling
- Always wrap API calls in try-catch
- Show user-friendly error messages
- Log errors for debugging
- Handle loading states

### Performance
- Memoize expensive computations
- Lazy load routes when needed
- Optimize images
- Use React DevTools Profiler

### Security
- Never expose API keys
- Validate user input
- Use HTTPS in production
- Keep dependencies updated

---

## 📞 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify backend is running
3. Check environment variables
4. Review troubleshooting section above
5. Check README.md in root directory

---

## 🎉 Conclusion

The frontend is a modern, responsive React application that provides a complete user interface for the Smart Student Portal. It features professional styling, smooth animations, and an intuitive user experience.

Happy coding! 🚀
