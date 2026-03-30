import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-menu">
        <Link to="/students-list" className="card">👥 View All Students</Link>
        <Link to="/mark-attendance" className="card">✓ Mark Attendance</Link>
        <Link to="/manage-attendance" className="card">📋 Manage Attendance</Link>
        <Link to="/upload-result" className="card">📊 Upload Result</Link>
        <Link to="/manage-results" className="card">✏️ Manage Results</Link>
      </div>
    </div>
  )
}

export default AdminDashboard
