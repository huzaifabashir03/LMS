import express from 'express';
import attendanceController from '../controllers/attendanceController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Route to get all attendance records - Admin only
router.get('/', protect, adminOnly, attendanceController.getAllAttendance);

// Route to mark attendance (POST /api/attendance) - Admin only
router.post('/', protect, adminOnly, attendanceController.markAttendance);

// Route to get attendance records for a student - Protected
router.get('/:studentId', protect, attendanceController.getAttendance);

// Route to update attendance - Admin only
router.put('/:id', protect, adminOnly, attendanceController.updateAttendance);

// Route to delete attendance record - Admin only
router.delete('/:id', protect, adminOnly, attendanceController.deleteAttendance);

export default router;