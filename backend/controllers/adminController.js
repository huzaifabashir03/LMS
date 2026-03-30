import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import Result from "../models/Result.js";
import bcrypt from "bcryptjs";

// @desc    Upload result
// @route   POST /api/admin/upload-result
// @access  Private (admin)
export const uploadResult = async (req, res) => {
  const { studentId, subject, grade } = req.body;

  try {
    // Validation
    if (!studentId || !subject || !grade) {
      return res.status(400).json({ message: "Student ID, subject, and grade are required" });
    }

    // Validate grade
    const validGrades = ["A", "B", "C", "D", "F"];
    if (!validGrades.includes(grade.toUpperCase())) {
      return res.status(400).json({ message: "Grade must be A, B, C, D, or F" });
    }

    // Validate subject is not empty
    if (typeof subject !== 'string' || subject.trim().length === 0) {
      return res.status(400).json({ message: "Subject must be a non-empty string" });
    }

    // Check if student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const result = await Result.create({ studentId, subject: subject.trim(), grade: grade.toUpperCase() });
    res.status(201).json({ message: "Result uploaded successfully", result });
  } catch (error) {
    console.error("Upload result error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    List all users (students and admins)
// @route   GET /api/admin/users
// @access  Private (admin)
export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
