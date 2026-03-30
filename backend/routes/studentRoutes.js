import express from "express";
import {
  getDashboard,
  getAttendance,
  getResults,
} from "../controllers/studentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // all routes protected

router.get("/dashboard", getDashboard);
router.get("/attendance", getAttendance);
router.get("/results", getResults);

export default router;
