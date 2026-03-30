import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContextValue'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <nav className="navbar">
        <h1><Link to="/">MERN Portal</Link></h1>
        <div>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </button>
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
