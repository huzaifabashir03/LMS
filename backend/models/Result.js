import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    grade: { type: String, enum: ["A", "B", "C", "D", "F"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
