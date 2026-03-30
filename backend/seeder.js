import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Models
import User from "./models/User.js";
import Attendance from "./models/Attendance.js";
import Result from "./models/Result.js";

// Config
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample Data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    rollNo: "A001",
    department: "Admin",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "student123",
    rollNo: "CS001",
    department: "Computer Science",
    role: "student",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "student123",
    rollNo: "CS002",
    department: "Computer Science",
    role: "student",
  },
  {
    name: "Bob Wilson",
    email: "bob@example.com",
    password: "student123",
    rollNo: "CS003",
    department: "Computer Science",
    role: "student",
  },
];

const attendances = [
  { studentRoll: "CS001", date: new Date("2025-12-01"), status: "present" },
  { studentRoll: "CS001", date: new Date("2025-12-02"), status: "present" },
  { studentRoll: "CS001", date: new Date("2025-12-03"), status: "absent" },
  { studentRoll: "CS002", date: new Date("2025-12-01"), status: "present" },
  { studentRoll: "CS002", date: new Date("2025-12-02"), status: "leave" },
  { studentRoll: "CS002", date: new Date("2025-12-03"), status: "present" },
  { studentRoll: "CS003", date: new Date("2025-12-01"), status: "absent" },
  { studentRoll: "CS003", date: new Date("2025-12-02"), status: "present" },
  { studentRoll: "CS003", date: new Date("2025-12-03"), status: "present" },
];

const results = [];

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Attendance.deleteMany();
    await Result.deleteMany();

    // Hash passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        return { ...user, password: await bcrypt.hash(user.password, salt) };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);

    // Map attendance & results to student IDs
    const userMap = {};
    createdUsers.forEach((user) => (userMap[user.rollNo] = user._id));

    const attendanceData = attendances.map((att) => ({
      studentId: userMap[att.studentRoll],
      date: att.date,
      status: att.status,
    }));

    const resultData = results.map((res) => ({
      studentId: userMap[res.studentRoll],
      subject: res.subject,
      totalMarks: res.totalMarks,
      obtainedMarks: res.obtainedMarks,
    }));

    // Insert attendance and results
    await Attendance.insertMany(attendanceData);
    await Result.insertMany(resultData);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(importData);
