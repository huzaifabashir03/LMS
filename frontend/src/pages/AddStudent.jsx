import { useState, useEffect } from 'react'
import { register } from '../api/api'

const AddStudent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [department, setDepartment] = useState('')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')
  const [loading, setLoading] = useState(false)
  const [createdStudentId, setCreatedStudentId] = useState('')

  useEffect(() => {
    setName('')
    setEmail('')
    setPassword('')
    setRollNo('')
    setDepartment('')
  }, [])

  const validateForm = () => {
    if (!name.trim()) return 'Full name is required'
    if (!email.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format'
    if (!password || password.length < 6) return 'Password must be at least 6 characters'
    if (!rollNo.trim()) return 'Roll number is required'
    if (!department.trim()) return 'Department is required'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setMsg('')
    setMsgType('')
    setCreatedStudentId('')
    setLoading(true)

    const validationError = validateForm()
    if (validationError) {
      setMsgType('error')
      setMsg(validationError)
      setLoading(false)
      return
    }

    try {
      const response = await register({ name, email, password, rollNo, department })

      setMsgType('success')
      const studentId = response.data.user.rollNo
      setCreatedStudentId(studentId)
      setMsg(`Student added successfully! Roll No: ${studentId}`)

      setName('')
      setEmail('')
      setPassword('')
      setRollNo('')
      setDepartment('')

    } catch (err) {
      setMsgType('error')

      let errorMsg = 'Failed to add student'

      if (err.response?.status === 400) {
        errorMsg = err.response?.data?.message || 'Please fill in all fields correctly'
      } else if (err.response?.status === 500) {
        errorMsg = 'Server error. Please try again later'
      } else if (err.message === 'Network Error') {
        errorMsg = 'Network error. Please check your connection'
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message
      }

      setMsg(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const copyStudentId = () => {
    if (createdStudentId) {
      navigator.clipboard.writeText(createdStudentId)
      alert('Student ID copied to clipboard!')
    }
  }

  return (
    <div className="page">
      <h2>Add Student</h2>

      {msg && (
        <div className={msgType === 'success' ? 'success' : 'error'}>
          <p>{msg}</p>
          {createdStudentId && (
            <button className="copy-btn" onClick={copyStudentId}>
              📋 Copy Roll Number
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" style={{ display: 'none' }} />
        <input type="password" style={{ display: 'none' }} />

        <div className="form-group">
          <label>Full Name *</label>
          <input 
            type="text" 
            name="student_name"
            placeholder="Enter student's full name" 
            value={name} 
            autoComplete="off"
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            name="student_email"
            placeholder="Enter valid email address" 
            value={email} 
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Password (min 6 characters) *</label>
          <input 
            type="password" 
            name="student_password"
            placeholder="Enter secure password" 
            value={password} 
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Roll Number *</label>
          <input 
            type="text" 
            name="student_rollNo"
            placeholder="Enter unique roll number" 
            value={rollNo} 
            autoComplete="off"
            onChange={(e) => setRollNo(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Department *</label>
          <input 
            type="text" 
            name="student_department"
            placeholder="Enter department name" 
            value={department} 
            autoComplete="off"
            onChange={(e) => setDepartment(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Student...' : 'Add Student'}
        </button>
      </form>

      <div className="info-box">
        <h4>📝 How to use Roll Number:</h4>
        <ul>
          <li>Use the Roll Number to mark attendance</li>
          <li>Use the Roll Number to upload results</li>
          <li>Use the Roll Number for other assignments</li>
          <li>View all students and their Roll Numbers in "Students List"</li>
        </ul>
      </div>
    </div>
  )
}

export default AddStudent
