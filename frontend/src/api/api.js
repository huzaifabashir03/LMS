import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

console.log('API Base URL:', API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const register = (data) => api.post('/auth/signup', data)
export const login = (data) => api.post('/auth/login', data)
export const getMe = () => api.get('/auth/me')
export const getDashboard = () => api.get('/student/dashboard')
export const getAttendance = () => api.get('/student/attendance')
export const getResults = () => api.get('/student/results')
export const listUsers = () => api.get('/admin/users')
export const addAttendance = (data) => api.post('/attendance', data)
export const addResult = (data) => api.post('/results', data)

// Admin CRUD for Attendance
export const getAllAttendance = () => api.get('/attendance')
export const getAttendanceById = (id) => api.get(`/attendance/${id}`)
export const updateAttendance = (id, data) => api.put(`/attendance/${id}`, data)
export const deleteAttendance = (id) => api.delete(`/attendance/${id}`)

// Admin CRUD for Results
export const getAllResults = () => api.get('/results')
export const getResultById = (id) => api.get(`/results/${id}`)
export const updateResult = (id, data) => api.put(`/results/${id}`, data)
export const deleteResult = (id) => api.delete(`/results/${id}`)
export const uploadResult = (data) => api.post('/admin/upload-result', data)

export default api
