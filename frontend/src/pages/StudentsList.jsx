import { useState, useEffect } from 'react'
import { listUsers } from '../api/api'

const StudentsList = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const response = await listUsers()
        // Filter only student role users
        const studentUsers = response.data.users.filter(user => user.role === 'student')
        setStudents(studentUsers)
        setError('')
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load students')
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="students-container">
      <div className="students-header">
        <h2>Students List</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email, roll number, or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading students...</span>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No Students Found</h3>
          <p>Add students first to view them here.</p>
        </div>
      ) : (
        <>
          <div className="students-table">
            <table>
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <code>{student.rollNo}</code>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(student.rollNo)}
                        title="Copy Roll Number"
                      >
                        📋
                      </button>
                    </td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>
                      <span className="badge active">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="students-stats">
            <div className="stat-card">
              <div className="label">Total Students</div>
              <div className="value">{filteredStudents.length}</div>
            </div>
            <div className="stat-card">
              <div className="label">Total Registered</div>
              <div className="value">{students.length}</div>
            </div>
            {students.length > 0 && (
              <div className="stat-card">
                <div className="label">Search Results</div>
                <div className="value">{filteredStudents.length} of {students.length}</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default StudentsList
