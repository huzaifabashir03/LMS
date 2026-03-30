import express from "express";
import {
  uploadResult,
  listUsers,
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.post("/upload-result", uploadResult);
router.get("/users", listUsers);

export default router;
