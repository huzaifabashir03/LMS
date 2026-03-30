import express from "express";
import courseController from "../controllers/courseController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", courseController.getAllCourses);

// Protected routes
router.get("/my-courses", protect, courseController.getStudentCourses);

// Admin only routes
router.post("/", protect, adminOnly, courseController.createCourse);
router.post("/assign", protect, adminOnly, courseController.assignCourseToStudent);
router.get("/enrollments", protect, adminOnly, courseController.getAllEnrollments);

export default router;
