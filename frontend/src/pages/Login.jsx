import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../api/api'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // ✅ FORCE CLEAR WHEN PAGE LOADS
  useEffect(() => {
    setEmail('')
    setPassword('')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setError('')
    setLoading(true)

    try {
      const response = await apiLogin({ email, password })
      const data = response.data

      const userData = {
        name: data.user?.name || data.name,
        role: data.user?.role || data.role,
        _id: data.user?._id || data._id
      }

      login(userData, data.token)

      // ✅ CLEAR INPUTS
      setEmail('')
      setPassword('')

      setTimeout(() => {
        navigate(userData.role === 'admin'
          ? '/admin-dashboard'
          : '/student-dashboard'
        )
      }, 200)

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed'
      )

      // ✅ CLEAR EVEN ON ERROR
      setEmail('')
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input 
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
