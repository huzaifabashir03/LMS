import Attendance from "../models/Attendance.js";
import Result from "../models/Result.js";

// @desc    Get student dashboard info
// @route   GET /api/student/dashboard
// @access  Private (student)
export const getDashboard = async (req, res) => {
  try {
    const student = req.user;
    res.status(200).json({
      name: student.name,
      email: student.email,
      rollNo: student.rollNo,
      department: student.department,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get student's attendance
// @route   GET /api/student/attendance
// @access  Private (student)
export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.user._id });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get student's results
// @route   GET /api/student/results
// @access  Private (student)
export const getResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user._id });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
