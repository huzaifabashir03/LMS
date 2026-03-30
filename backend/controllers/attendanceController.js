import Attendance from '../models/Attendance.js';
import User from '../models/User.js';

// Mark attendance for a student
const markAttendance = async (req, res) => {
    const { student, date, status } = req.body;

    try {
        // Validate input
        if (!student || !date || !status) {
            return res.status(400).json({ message: 'Please provide student roll number, date, and status' });
        }

        // Validate date format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
        }

        // Validate status
        const validStatuses = ['present', 'absent', 'leave'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ message: 'Status must be present, absent, or leave' });
        }

        // Trim and find user by rollNo (student identifier)
        const trimmedRollNo = String(student).trim();
        if (trimmedRollNo.length === 0) {
            return res.status(400).json({ message: 'Student roll number cannot be empty' });
        }

        const user = await User.findOne({ rollNo: trimmedRollNo });
        
        if (!user) {
            return res.status(404).json({ message: 'Student not found. Please check the roll number.' });
        }

        const attendanceRecord = new Attendance({ studentId: user._id, date, status: status.toLowerCase() });
        await attendanceRecord.save();
        res.status(201).json({ message: 'Attendance marked successfully', attendanceRecord });
    } catch (error) {
        console.error('Mark attendance error:', error);
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
};

// Get attendance records for a student
const getAttendance = async (req, res) => {
    const { studentId } = req.params;

    try {
        const attendanceRecords = await Attendance.find({ studentId });
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendance records', error });
    }
};

// Get all attendance records
const getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('studentId', 'name rollNo email department');
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Get all attendance error:', error);
        res.status(500).json({ message: 'Error retrieving attendance records', error: error.message });
    }
};

// Update attendance
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate input if status is being updated
        if (req.body.status !== undefined) {
            const validStatuses = ['present', 'absent', 'leave'];
            if (!validStatuses.includes(req.body.status.toLowerCase())) {
                return res.status(400).json({ message: 'Status must be present, absent, or leave' });
            }
            req.body.status = req.body.status.toLowerCase();
        }

        const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance updated successfully', updatedAttendance });
    } catch (error) {
        console.error('Update attendance error:', error);
        res.status(500).json({ message: 'Error updating attendance', error: error.message });
    }
};

// Delete attendance
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await Attendance.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        console.error('Delete attendance error:', error);
        res.status(500).json({ message: 'Error deleting attendance', error: error.message });
    }
};

export default {
    markAttendance,
    getAttendance,
    getAllAttendance,
    updateAttendance,
    deleteAttendance
};