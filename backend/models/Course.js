import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    instructor: { type: String, required: true },
    credits: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
