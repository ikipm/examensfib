import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  quarter: {
    type: Number,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  }
});

export default mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema);
