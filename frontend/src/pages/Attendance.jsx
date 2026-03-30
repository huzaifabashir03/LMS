import { useState, useEffect } from 'react'
import { getAttendance } from '../api/api'

const Attendance = () => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setError('')
        const { data } = await getAttendance()
        setRecords(data || [])
      } catch (err) {
        console.error('Failed to fetch attendance', err)
        setError(err.response?.data?.message || 'Failed to load attendance records')
      } finally {
        setLoading(false)
      }
    }
    fetchAttendance()
  }, [])

  // Calculate attendance statistics
  const stats = {
    total: records.length,
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    leave: records.filter(r => r.status === 'leave').length,
    percentage: records.length > 0 ? Math.round((records.filter(r => r.status === 'present').length / records.length) * 100) : 0
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return '✓'
      case 'absent': return '✕'
      case 'leave': return '⊘'
      default: return '?'
    }
  }

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h2>📅 Your Attendance</h2>
        <p className="attendance-subtitle">Track your attendance records</p>
      </div>

      {error && (
        <div className="attendance-alert error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="attendance-loading">
          <div className="spinner"></div>
          <p>Loading your attendance records...</p>
        </div>
      ) : records.length === 0 ? (
        <div className="attendance-empty">
          <div className="empty-icon">📭</div>
          <p>No attendance records found</p>
        </div>
      ) : (
        <>
          <div className="attendance-stats">
            <div className="stat-card">
              <div className="stat-icon total">📊</div>
              <div className="stat-content">
                <p className="stat-label">Total Classes</p>
                <p className="stat-value">{stats.total}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon present">✓</div>
              <div className="stat-content">
                <p className="stat-label">Present</p>
                <p className="stat-value">{stats.present}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon absent">✕</div>
              <div className="stat-content">
                <p className="stat-label">Absent</p>
                <p className="stat-value">{stats.absent}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon leave">⊘</div>
              <div className="stat-content">
                <p className="stat-label">Leave</p>
                <p className="stat-value">{stats.leave}</p>
              </div>
            </div>
            <div className="stat-card percentage">
              <div className="stat-icon attendance-percent">%</div>
              <div className="stat-content">
                <p className="stat-label">Attendance %</p>
                <p className="stat-value">{stats.percentage}%</p>
              </div>
            </div>
          </div>

          <div className="attendance-table-container">
            <div className="table-header">
              <h3>Attendance Records</h3>
              <span className="record-count">{records.length} records</span>
            </div>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, index) => (
                  <tr key={r._id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <td className="date-cell">
                      <span className="date-icon">📆</span>
                      <span className="date-text">
                        {new Date(r.date).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </td>
                    <td className="status-cell">
                      <span className={`status-badge status-${r.status}`}>
                        {getStatusIcon(r.status)} {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Attendance
