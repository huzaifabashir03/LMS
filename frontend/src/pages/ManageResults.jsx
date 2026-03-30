import { useState, useEffect } from 'react'
import { getAllResults, updateResult, deleteResult, listUsers } from '../api/api'

const ManageResults = () => {
  const [results, setResults] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editSubject, setEditSubject] = useState('')
  const [editGrade, setEditGrade] = useState('A')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const resultsRes = await getAllResults()
      // Results now include populated studentId object
      const resultsData = Array.isArray(resultsRes.data) ? resultsRes.data : (resultsRes.data?.results || [])
      setResults(resultsData)
      if (resultsData.length === 0) {
        setMsg('No results found')
        setMsgType('info')
      }
    } catch (err) {
      console.error('Failed to fetch results', err)
      const errorMsg = err.response?.data?.message || 'Failed to load results'
      setMsg(errorMsg)
      setMsgType('error')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const getStudentName = (studentId) => {
    // studentId is now a populated object with student details
    if (typeof studentId === 'object' && studentId?.name) {
      return `${studentId.name} (${studentId.rollNo})`
    }
    // Fallback for direct ID reference
    const student = students.find(s => s._id === studentId)
    return student ? `${student.name} (${student.rollNo})` : 'Unknown'
  }

  const handleEdit = (record) => {
    setEditingId(record._id)
    setEditSubject(record.subject)
    setEditGrade(record.grade)
  }

  const handleSaveEdit = async (id) => {
    try {
      setMsg('')
      setMsgType('')

      // Validate subject
      if (!editSubject.trim()) {
        setMsgType('error')
        setMsg('Subject is required')
        return
      }

      // Validate grade
      const validGrades = ['A', 'B', 'C', 'D', 'F']
      if (!validGrades.includes(editGrade)) {
        setMsgType('error')
        setMsg('Invalid grade')
        return
      }

      await updateResult(id, { subject: editSubject.trim(), grade: editGrade })
      setMsgType('success')
      setMsg('Result updated successfully!')
      setEditingId(null)
      fetchData()
    } catch (err) {
      setMsgType('error')
      setMsg(err.response?.data?.message || 'Failed to update result')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      try {
        setMsg('')
        setMsgType('')
        await deleteResult(id)
        setMsgType('success')
        setMsg('Result deleted successfully!')
        fetchData()
      } catch (err) {
        setMsgType('error')
        setMsg(err.response?.data?.message || 'Failed to delete result')
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditSubject('')
    setEditGrade('A')
  }

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': return '#28a745'
      case 'B': return '#0069d9'
      case 'C': return '#ffc107'
      case 'D': return '#ff6b6b'
      case 'F': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const filteredResults = results.filter(r =>
    getStudentName(r.studentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page">
      <h2>Manage Results</h2>

      {msg && <p className={msgType === 'success' ? 'success' : 'error'}>{msg}</p>}

      {loading ? (
        <p>Loading results...</p>
      ) : results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by student name, roll number, or subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((r) => (
                  <tr key={r._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td>{getStudentName(r.studentId)}</td>
                    <td>
                      {editingId === r._id ? (
                        <input
                          type="text"
                          value={editSubject}
                          onChange={(e) => setEditSubject(e.target.value)}
                          placeholder="Subject"
                        />
                      ) : (
                        r.subject
                      )}
                    </td>
                    <td>
                      {editingId === r._id ? (
                        <select value={editGrade} onChange={(e) => setEditGrade(e.target.value)}>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                        </select>
                      ) : (
                        <span style={{
                          display: 'inline-block',
                          backgroundColor: getGradeColor(r.grade),
                          color: 'white',
                          padding: '5px 12px',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          minWidth: '40px',
                          textAlign: 'center'
                        }}>
                          {r.grade}
                        </span>
                      )}
                    </td>
                    <td>
                      {editingId === r._id ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(r._id)}
                            style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(r)}
                            style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#0069d9', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(r._id)}
                            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: '20px' }}>
            Total Records: <strong>{filteredResults.length}</strong>
          </p>
        </>
      )}
    </div>
  )
}

export default ManageResults
