import { useState, useEffect } from 'react'
import { getAllCourses, assignCourseToStudent, getAllEnrollments } from '../api/api'

const AssignCourse = () => {
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')

  const [studentRollNo, setStudentRollNo] = useState('')
  const [courseCode, setCourseCode] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, enrollmentsRes] = await Promise.all([
          getAllCourses(),
          getAllEnrollments()
        ])
        setCourses(coursesRes.data.courses || [])
        setEnrollments(enrollmentsRes.data.enrollments || [])
      } catch (err) {
        console.error('Failed to fetch data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    setMsgType('')

    if (!studentRollNo.trim() || !courseCode.trim()) {
      setMsgType('error')
      setMsg('Student Roll Number and Course Code are required')
      return
    }

    try {
      await assignCourseToStudent({
        studentRollNo: studentRollNo.trim(),
        courseCode: courseCode.toUpperCase().trim()
      })
      setMsgType('success')
      setMsg(`Course assigned successfully to student ${studentRollNo}!`)

      setStudentRollNo('')
      setCourseCode('')

      // Refresh enrollments
      const { data } = await getAllEnrollments()
      setEnrollments(data.enrollments || [])
    } catch (err) {
      setMsgType('error')
      let errorMsg = 'Failed to assign course'
      if (err.response?.status === 400) {
        errorMsg = err.response?.data?.message || 'Invalid input'
      } else if (err.response?.status === 404) {
        errorMsg = err.response?.data?.message || 'Student or course not found'
      } else if (err.response?.status === 409) {
        errorMsg = err.response?.data?.message || 'Student already enrolled in this course'
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
      <h2>Assign Courses to Students</h2>

      {msg && <p className={msgType === 'success' ? 'success' : 'error'}>{msg}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Assignment Form */}
        <div>
          <h3>Assign Course</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Student Roll Number *</label>
              <input
                type="text"
                placeholder="e.g., 12345"
                value={studentRollNo}
                onChange={(e) => setStudentRollNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Course Code *</label>
              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
              >
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Assign Course</button>
          </form>

          <h3 style={{ marginTop: '30px' }}>Available Courses</h3>
          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p>No courses available</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
              {courses.map((course) => (
                <div key={course._id} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', background: '#f5f5f5' }}>
                  <strong>{course.code}</strong> - {course.name}
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>{course.instructor} ({course.credits} credits)</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enrollments List */}
        <div>
          <h3>Recent Enrollments ({enrollments.length})</h3>
          {loading ? (
            <p>Loading enrollments...</p>
          ) : enrollments.length === 0 ? (
            <p>No enrollments yet</p>
          ) : (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment._id}
                  style={{
                    padding: '12px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: '#f9f9f9'
                  }}
                >
                  <p style={{ margin: '0 0 5px 0' }}>
                    <strong>{enrollment.studentId?.rollNo}</strong> - {enrollment.studentId?.name}
                  </p>
                  <p style={{ margin: '3px 0' }}>
                    📚 {enrollment.courseId?.code} - {enrollment.courseId?.name}
                  </p>
                  <p style={{ margin: '3px 0', fontSize: '0.85em', color: '#666' }}>
                    Status: <span style={{ background: '#e8f5e9', padding: '2px 6px', borderRadius: '3px' }}>
                      {enrollment.status}
                    </span>
                  </p>
                  {enrollment.enrollmentDate && (
                    <p style={{ margin: '3px 0', fontSize: '0.85em', color: '#666' }}>
                      Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignCourse
