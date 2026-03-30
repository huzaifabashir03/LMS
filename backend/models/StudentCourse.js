import mongoose from "mongoose";

const studentCourseSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    enrollmentDate: { type: Date, default: Date.now },
    grade: { type: String },
    status: { type: String, enum: ["enrolled", "completed", "dropped"], default: "enrolled" },
  },
  { timestamps: true }
);

export default mongoose.model("StudentCourse", studentCourseSchema);
