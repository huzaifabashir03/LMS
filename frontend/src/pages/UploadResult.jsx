import { useState, useRef } from 'react'
import { addResult } from '../api/api'

const UploadResult = () => {
  const [studentId, setStudentId] = useState('')
  const [subject, setSubject] = useState('')
  const [grade, setGrade] = useState('A')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    setMsgType('')
    
    // Validate fields are filled
    if (!studentId.trim() || !subject.trim() || !grade) {
      setMsgType('error')
      setMsg('All fields are required')
      return
    }
    
    try {
      await addResult({ student: studentId.trim(), subject: subject.trim(), grade })
      setMsgType('success')
      setMsg('Result uploaded successfully!')
      
      // Clear form
      if (formRef.current) {
        formRef.current.reset()
      }
      setStudentId('')
      setSubject('')
      setGrade('A')
    } catch (err) {
      setMsgType('error')
      let errorMsg = 'Failed to upload result'
      
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
      <h2>Upload Result</h2>
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
          type="text" 
          placeholder="Subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          required 
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value)} required>
          <option value="A">A (Excellent)</option>
          <option value="B">B (Good)</option>
          <option value="C">C (Average)</option>
          <option value="D">D (Below Average)</option>
          <option value="F">F (Fail)</option>
        </select>
        <button type="submit">Upload Result</button>
      </form>
    </div>
  )
}

export default UploadResult
