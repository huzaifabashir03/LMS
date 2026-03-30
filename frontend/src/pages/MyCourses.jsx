import { useState, useEffect } from 'react'
import { getStudentCourses } from '../api/api'

const MyCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await getStudentCourses()
        setCourses(data.courses || [])
        setError('')
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses')
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className="page">
      <h2>My Courses</h2>
      
      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses assigned yet</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.name}</h3>
              <p><strong>Code:</strong> {course.code}</p>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Credits:</strong> {course.credits}</p>
              {course.description && <p><strong>Description:</strong> {course.description}</p>}
              {course.grade && <p><strong>Grade:</strong> {course.grade}</p>}
              <p><strong>Status:</strong> <span className="badge">{course.status}</span></p>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .course-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          background: #f9f9f9;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .course-card h3 {
          margin-top: 0;
          color: #333;
        }
        .course-card p {
          margin: 10px 0;
          font-size: 14px;
        }
        .badge {
          background: #4CAF50;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

export default MyCourses
