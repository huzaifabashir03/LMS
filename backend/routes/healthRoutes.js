// Health check and status endpoints
import express from "express";
const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API status
router.get("/api/status", (req, res) => {
  res.status(200).json({
    message: "Smart Student Portal API",
    version: "1.0.0",
    status: "Running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

export default router;
