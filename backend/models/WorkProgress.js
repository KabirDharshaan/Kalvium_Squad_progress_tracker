const mongoose = require("mongoose");

const workProgressSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    squadNo: {
      type: String,
      required: false,
    },
    belt: {
      type: String,
      enum: ["Purple", "Blue", "Brown", "General"],
      required: true,
    },
    solved: {
      type: Number,
      required: true,
    },
    date: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

const WorkProgress = mongoose.model("WorkProgress", workProgressSchema);
module.exports = WorkProgress;
