import { useState, useEffect, useRef } from 'react'
import { getAllCourses, createCourse } from '../api/api'

const ManageCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [credits, setCredits] = useState(3)

  const formRef = useRef(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const { data } = await getAllCourses()
      setCourses(data.courses || [])
    } catch (err) {
      console.error('Failed to fetch courses', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    setMsgType('')

    // Validate
    if (!name.trim() || !code.trim() || !instructor.trim()) {
      setMsgType('error')
      setMsg('Course name, code, and instructor are required')
      return
    }

    try {
      await createCourse({ name, code, description, instructor, credits: parseInt(credits) })
      setMsgType('success')
      setMsg('Course created successfully!')

      // Reset form
      if (formRef.current) {
        formRef.current.reset()
      }
      setName('')
      setCode('')
      setDescription('')
      setInstructor('')
      setCredits(3)

      // Refresh courses list
      fetchCourses()
    } catch (err) {
      setMsgType('error')
      let errorMsg = 'Failed to create course'
      if (err.response?.status === 400) {
        errorMsg = err.response?.data?.message || 'Invalid input'
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
      <h2>Manage Courses</h2>

      {msg && <p className={msgType === 'success' ? 'success' : 'error'}>{msg}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Create Course Form */}
        <div>
          <h3>Create New Course</h3>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-group">
              <label>Course Name *</label>
              <input
                type="text"
                placeholder="e.g., Mathematics I"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Course Code *</label>
              <input
                type="text"
                placeholder="e.g., MATH101"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
              />
            </div>

            <div className="form-group">
              <label>Instructor *</label>
              <input
                type="text"
                placeholder="e.g., Dr. John Smith"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </div>

            <button type="submit">Create Course</button>
          </form>
        </div>

        {/* Courses List */}
        <div>
          <h3>Available Courses ({courses.length})</h3>
          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p>No courses created yet</p>
          ) : (
            <div className="courses-list">
              {courses.map((course) => (
                <div key={course._id} className="course-item">
                  <h4>{course.name}</h4>
                  <p><strong>{course.code}</strong></p>
                  <p><small>{course.instructor}</small></p>
                  <p><small>Credits: {course.credits}</small></p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .courses-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 600px;
          overflow-y: auto;
        }
        .course-item {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 4px;
          background: #f5f5f5;
        }
        .course-item h4 {
          margin: 0 0 5px 0;
        }
        .course-item p {
          margin: 3px 0;
        }
      `}</style>
    </div>
  )
}

export default ManageCourses
