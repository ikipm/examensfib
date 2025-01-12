import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  course: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
  },
  contents: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

export default mongoose.model('Subject', SubjectSchema);
