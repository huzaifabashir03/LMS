import { useState, useEffect } from 'react'
import { getAllAttendance, updateAttendance, deleteAttendance } from '../api/api'

const ManageAttendance = () => {
  const [attendances, setAttendances] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDate, setEditDate] = useState('')
  const [editStatus, setEditStatus] = useState('present')

  useEffect(() => {
    fetchAttendances()
  }, [])

  const fetchAttendances = async () => {
    try {
      setLoading(true)
      console.log('Fetching attendance records...')
      const response = await getAllAttendance()
      console.log('Attendance response:', response)
      const { data } = response
      // Ensure data is an array
      const attendanceData = Array.isArray(data) ? data : (data?.attendances || [])
      console.log('Processed attendance data:', attendanceData)
      setAttendances(attendanceData)
      if (attendanceData.length === 0) {
        setMsg('No attendance records found')
        setMsgType('info')
      }
    } catch (err) {
      console.error('Failed to fetch attendance:', err)
      console.error('Error details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers
      })
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load attendance records'
      setMsg(errorMsg)
      setMsgType('error')
      setAttendances([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (record) => {
    setEditingId(record._id)
    setEditDate(record.date.split('T')[0])
    setEditStatus(record.status)
  }

  const handleSaveEdit = async (id) => {
    try {
      setMsg('')
      setMsgType('')

      // Validate date
      if (!editDate) {
        setMsgType('error')
        setMsg('Date is required')
        return
      }

      // Validate status
      const validStatuses = ['present', 'absent', 'leave']
      if (!validStatuses.includes(editStatus)) {
        setMsgType('error')
        setMsg('Invalid status')
        return
      }

      await updateAttendance(id, { date: editDate, status: editStatus })
      setMsgType('success')
      setMsg('Attendance updated successfully!')
      setEditingId(null)
      fetchAttendances()
    } catch (err) {
      setMsgType('error')
      setMsg(err.response?.data?.message || 'Failed to update attendance')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        setMsg('')
        setMsgType('')
        await deleteAttendance(id)
        setMsgType('success')
        setMsg('Attendance deleted successfully!')
        fetchAttendances()
      } catch (err) {
        setMsgType('error')
        setMsg(err.response?.data?.message || 'Failed to delete attendance')
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditDate('')
    setEditStatus('present')
  }

  const filteredAttendances = attendances.filter(a =>
    a.studentId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.studentId?.rollNo?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="manage-attendance">
      <div className="manage-attendance-header">
        <h2>📋 Manage Attendance</h2>
        <p className="manage-attendance-subtitle">Edit or delete attendance records</p>
      </div>

      {msg && (
        <div className={`manage-attendance-alert ${msgType}`}>
          <span>{msg}</span>
        </div>
      )}

      {loading ? (
        <div className="manage-attendance-loading">
          <div className="spinner"></div>
          <p>Loading attendance records...</p>
        </div>
      ) : attendances.length === 0 ? (
        <div className="manage-attendance-empty">
          <div className="empty-icon">📭</div>
          <p>No attendance records found</p>
        </div>
      ) : (
        <div className="manage-attendance-container">
          <div className="manage-attendance-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-results">{filteredAttendances.length} records</span>
          </div>

          <div className="manage-attendance-table-wrapper">
            <table className="manage-attendance-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendances.map((a, index) => (
                  <tr key={a._id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <td className="col-name">
                      <span className="student-avatar">{a.studentId?.name?.charAt(0).toUpperCase()}</span>
                      {a.studentId?.name}
                    </td>
                    <td className="col-roll">
                      <span className="roll-badge">{a.studentId?.rollNo}</span>
                    </td>
                    <td className="col-date">
                      {editingId === a._id ? (
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="date-input"
                        />
                      ) : (
                        <span className="date-text">
                          {new Date(a.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      )}
                    </td>
                    <td className="col-status">
                      {editingId === a._id ? (
                        <select 
                          value={editStatus} 
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="status-select"
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="leave">Leave</option>
                        </select>
                      ) : (
                        <span className={`status-badge status-${a.status}`}>
                          {a.status === 'present' && '✓'} 
                          {a.status === 'absent' && '✕'} 
                          {a.status === 'leave' && '⊘'} 
                          {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="col-actions">
                      {editingId === a._id ? (
                        <div className="action-buttons-edit">
                          <button
                            onClick={() => handleSaveEdit(a._id)}
                            className="btn-save"
                            title="Save changes"
                          >
                            ✓ Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="btn-cancel"
                            title="Cancel editing"
                          >
                            ✕ Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEdit(a)}
                            className="btn-edit"
                            title="Edit this record"
                          >
                            ✎ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(a._id)}
                            className="btn-delete"
                            title="Delete this record"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="manage-attendance-footer">
            <div className="footer-stats">
              <div className="stat">
                <span className="stat-label">Total Records:</span>
                <span className="stat-value">{filteredAttendances.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Displaying:</span>
                <span className="stat-value">{filteredAttendances.length} of {attendances.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageAttendance
