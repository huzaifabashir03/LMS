import Course from "../models/Course.js";
import StudentCourse from "../models/StudentCourse.js";
import User from "../models/User.js";

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (admin)
const createCourse = async (req, res) => {
  try {
    const { name, code, description, instructor, credits } = req.body;

    // Validate required fields
    if (!name || !code || !instructor) {
      return res.status(400).json({ message: "Name, code, and instructor are required" });
    }

    // Check if course code already exists
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ message: "Course code already exists" });
    }

    const course = await Course.create({
      name,
      code,
      description,
      instructor,
      credits,
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Assign course to student
// @route   POST /api/courses/assign
// @access  Private (admin)
const assignCourseToStudent = async (req, res) => {
  try {
    const { studentRollNo, courseCode } = req.body;

    if (!studentRollNo || !courseCode) {
      return res.status(400).json({ message: "Student roll number and course code are required" });
    }

    // Find student by rollNo
    const student = await User.findOne({ rollNo: studentRollNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find course by code
    const course = await Course.findOne({ code: courseCode });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await StudentCourse.findOne({
      studentId: student._id,
      courseId: course._id,
    });
    if (existingEnrollment) {
      return res.status(400).json({ message: "Student is already enrolled in this course" });
    }

    // Create enrollment
    const enrollment = await StudentCourse.create({
      studentId: student._id,
      courseId: course._id,
    });

    res.status(201).json({ message: "Course assigned to student successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get student's courses
// @route   GET /api/courses/my-courses
// @access  Private (student)
const getStudentCourses = async (req, res) => {
  try {
    const enrollments = await StudentCourse.find({ studentId: req.user._id }).populate(
      "courseId",
      "name code description instructor credits"
    );

    const courses = enrollments.map((enrollment) => ({
      ...enrollment.courseId.toObject(),
      enrollmentId: enrollment._id,
      grade: enrollment.grade,
      status: enrollment.status,
    }));

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all student enrollments (admin)
// @route   GET /api/courses/enrollments
// @access  Private (admin)
const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await StudentCourse.find()
      .populate("studentId", "name email rollNo")
      .populate("courseId", "name code instructor");

    res.status(200).json({ enrollments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default {
  createCourse,
  getAllCourses,
  assignCourseToStudent,
  getStudentCourses,
  getAllEnrollments,
};
