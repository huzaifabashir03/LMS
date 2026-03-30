import { useState, useEffect } from 'react'
import { getResults } from '../api/api'

const Results = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setError('')
        const { data } = await getResults()
        setResults(data || [])
      } catch (err) {
        console.error('Failed to fetch results', err)
        setError(err.response?.data?.message || 'Failed to load results')
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [])

  const getGradeColor = (grade) => {
    switch(grade?.toUpperCase()) {
      case 'A': return 'grade-a'
      case 'B': return 'grade-b'
      case 'C': return 'grade-c'
      case 'D': return 'grade-d'
      case 'F': return 'grade-f'
      default: return 'grade-unknown'
    }
  }

  const getGradeDescription = (grade) => {
    switch(grade?.toUpperCase()) {
      case 'A': return 'Excellent'
      case 'B': return 'Very Good'
      case 'C': return 'Good'
      case 'D': return 'Fair'
      case 'F': return 'Fail'
      default: return 'Unknown'
    }
  }

  // Calculate average grade
  const averageMarks = results.length > 0 
    ? Math.round(results.reduce((sum, r) => sum + (r.obtainedMarks || 0), 0) / results.length)
    : 0

  return (
    <div className="results-page">
      <div className="results-header">
        <h2>🏆 Your Results</h2>
        <p className="results-subtitle">View your academic performance</p>
      </div>

      {error && (
        <div className="results-alert error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="results-loading">
          <div className="spinner"></div>
          <p>Loading your results...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="results-empty">
          <div className="empty-icon">📚</div>
          <p>No results available yet</p>
        </div>
      ) : (
        <>
          <div className="results-stats">
            <div className="results-stat-card">
              <div className="results-stat-icon">📊</div>
              <div className="results-stat-content">
                <p className="results-stat-label">Total Subjects</p>
                <p className="results-stat-value">{results.length}</p>
              </div>
            </div>
            <div className="results-stat-card highlight">
              <div className="results-stat-icon">📈</div>
              <div className="results-stat-content">
                <p className="results-stat-label">Average Marks</p>
                <p className="results-stat-value">{averageMarks}</p>
              </div>
            </div>
          </div>

          <div className="results-container">
            <div className="results-header-bar">
              <h3>Subject Results</h3>
              <span className="results-count">{results.length} subjects</span>
            </div>

            <div className="results-grid">
              {results.map((r) => (
                <div key={r._id} className={`result-card ${getGradeColor(r.grade)}`}>
                  <div className="result-card-header">
                    <h4 className="subject-name">{r.subject}</h4>
                    <span className={`grade-badge ${getGradeColor(r.grade)}`}>
                      {r.grade?.toUpperCase()}
                    </span>
                  </div>
                  <div className="result-card-body">
                    <div className="result-item">
                      <span className="result-label">Obtained Marks</span>
                      <span className="result-value">{r.obtainedMarks || 'N/A'}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Total Marks</span>
                      <span className="result-value">{r.totalMarks || 'N/A'}</span>
                    </div>
                    {r.obtainedMarks && r.totalMarks && (
                      <div className="result-item">
                        <span className="result-label">Percentage</span>
                        <span className="result-value">
                          {Math.round((r.obtainedMarks / r.totalMarks) * 100)}%
                        </span>
                      </div>
                    )}
                    <div className="result-grade-description">
                      {getGradeDescription(r.grade)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="results-table-container">
            <div className="table-header">
              <h3>Detailed View</h3>
            </div>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Obtained</th>
                  <th>Total</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, index) => (
                  <tr key={r._id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <td className="subject-cell">
                      <span className="subject-icon">📖</span>
                      {r.subject}
                    </td>
                    <td className="marks-cell">{r.obtainedMarks || 'N/A'}</td>
                    <td className="marks-cell">{r.totalMarks || 'N/A'}</td>
                    <td className="grade-cell">
                      <span className={`grade-badge ${getGradeColor(r.grade)}`}>
                        {r.grade?.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Results
