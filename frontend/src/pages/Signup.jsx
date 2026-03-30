import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as apiRegister } from '../api/api'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [department, setDepartment] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // Clear fields on first mount
  useEffect(() => {
    setName('')
    setEmail('')
    setPassword('')
    setRollNo('')
    setDepartment('')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await apiRegister({ name, email, password, rollNo, department })

      // ✅ Success
      setSuccess('Signup successful! Redirecting to login...')

      setName('')
      setEmail('')
      setPassword('')
      setRollNo('')
      setDepartment('')

      setTimeout(() => {
        navigate('/login')
      }, 1500)

    } catch (err) {
      let errorMessage = 'Signup failed'

      if (err.response?.status === 400) {
        const msg = err.response?.data?.message
        if (msg?.toLowerCase().includes('password')) {
          errorMessage = msg
        } else if (msg?.toLowerCase().includes('email')) {
          errorMessage = msg
        } else if (msg?.toLowerCase().includes('roll')) {
          errorMessage = msg
        } else if (msg?.toLowerCase().includes('required')) {
          errorMessage = 'Please fill in all required fields'
        } else if (msg) {
          errorMessage = msg
        }
      } else if (err.response?.status === 500) {
        errorMessage = 'Server error. Please try again later'
      } else if (err.message === 'Network Error') {
        errorMessage = 'Network error. Please check your connection'
      } else if (err.message) {
        errorMessage = err.message
      }

      // ✅ Do NOT clear fields on error
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} autoComplete="off">

        {/* Dummy hidden inputs to prevent Chrome autofill */}
        <input type="text" style={{ display: 'none' }} />
        <input type="password" style={{ display: 'none' }} />

        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          name="signup_name"
          placeholder="Full Name"
          value={name}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          name="signup_email"
          placeholder="Email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          name="signup_password"
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          name="signup_rollNo"
          placeholder="Roll Number"
          value={rollNo}
          autoComplete="off"
          onChange={(e) => setRollNo(e.target.value)}
          required
        />

        <input
          type="text"
          name="signup_department"
          placeholder="Department"
          value={department}
          autoComplete="off"
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Signup
