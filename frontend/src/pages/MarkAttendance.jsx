import { useState, useRef } from 'react'
import { addAttendance } from '../api/api'

const MarkAttendance = () => {
  const [studentId, setStudentId] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('present')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    setMsgType('')
    
    // Validate fields are filled
    if (!studentId.trim() || !date || !status) {
      setMsgType('error')
      setMsg('All fields are required')
      return
    }

    // Validate date is not in future
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate > today) {
      setMsgType('error')
      setMsg('Cannot mark attendance for future dates')
      return
    }
    
    try {
      await addAttendance({ student: studentId.trim(), date, status })
      setMsgType('success')
      setMsg('Attendance marked successfully!')
      
      // Clear form
      if (formRef.current) {
        formRef.current.reset()
      }
      setStudentId('')
      setDate('')
      setStatus('present')
    } catch (err) {
      setMsgType('error')
      let errorMsg = 'Failed to mark attendance'
      
      if (err.response?.status === 400) {
        errorMsg = err.response?.data?.message || 'Please fill in all fields correctly'
      } else if (err.response?.status === 404) {
        errorMsg = 'Student not found. Please check the roll number'
      } else if (err.response?.status === 500) {
        errorMsg = 'Server error. Please try again later'
      } else if (err.message === 'Network Error') {
        errorMsg = 'Network error. Please check your connection'
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message
      }
      
      setMsg(errorMsg)
    }
  }

  return (
    <div className="page">
      <h2>Mark Attendance</h2>
      {msg && <p className={msgType === 'success' ? 'success' : 'error'}>{msg}</p>}
      <form onSubmit={handleSubmit} ref={formRef}>
        <input 
          type="text" 
          placeholder="Enter Student Roll Number" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="leave">Leave</option>
        </select>
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  )
}

export default MarkAttendance
