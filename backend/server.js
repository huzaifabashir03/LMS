// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import validation from "./config/validation.js"; // Validate env vars

// Import Middlewares
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" })); // Increased limit for file uploads
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet()); // Security headers
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")); // Logging

// Routes
app.use("/health", healthRoutes); // Health check
app.use("/api/health", healthRoutes); // Alternative health endpoint
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);

// Serve Frontend Static Files in Production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));
  app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Default Route
app.get("/", (req, res) => {
  res.send("Smart Student Portal Backend is Running...");
});

// 404 Handler
app.use(notFound);

// Error Handler Middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("\n⏹️  Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("❌ Forced shutdown");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Default Route
app.get("/", (req, res) => {
  res.send("Smart Student Portal Backend is Running...");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
