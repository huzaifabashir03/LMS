import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StudentDashboard from './pages/StudentDashboard'
import Attendance from './pages/Attendance'
import Results from './pages/Results'
import AdminDashboard from './pages/AdminDashboard'
import StudentsList from './pages/StudentsList'
import MarkAttendance from './pages/MarkAttendance'
import UploadResult from './pages/UploadResult'
import ManageAttendance from './pages/ManageAttendance'
import ManageResults from './pages/ManageResults'

const AppContent = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student-dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
        <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
        <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/students-list" element={<AdminRoute><StudentsList /></AdminRoute>} />
        <Route path="/mark-attendance" element={<AdminRoute><MarkAttendance /></AdminRoute>} />
        <Route path="/upload-result" element={<AdminRoute><UploadResult /></AdminRoute>} />
        <Route path="/manage-attendance" element={<AdminRoute><ManageAttendance /></AdminRoute>} />
        <Route path="/manage-results" element={<AdminRoute><ManageResults /></AdminRoute>} />
      </Routes>
      <Footer />
    </Router>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
