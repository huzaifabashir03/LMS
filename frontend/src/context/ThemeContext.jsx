import { useState, useEffect } from 'react'
import { ThemeContext } from './ThemeContextValue'

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark))
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
