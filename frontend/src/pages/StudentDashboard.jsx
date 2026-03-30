import { Link } from 'react-router-dom'

const StudentDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <div className="dashboard-menu">
        <Link to="/attendance" className="card">Attendance</Link>
        <Link to="/results" className="card">Results</Link>
      </div>
    </div>
  )
}

export default StudentDashboard
