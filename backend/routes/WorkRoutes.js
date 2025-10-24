

const express = require("express");
const router = express.Router();
const WorkProgress = require("../models/WorkProgress");
const Student = require("../models/Student");

// ✅ Helper: get squad number from email (handles both `.s81` and `.s.134`)
const getSquadFromEmail = (email) => {
  // This regex matches .s81@, .s.134@, .s1@ etc.
  const match = email.match(/\.s\.?(\d+)@/);
  return match ? match[1] : null;
};

// ✅ Create new progress (always creates a new document)
router.post("/update", async (req, res) => {
  try {
    const { studentName, belt, solved, date } = req.body;

    if (!studentName || !belt || solved === undefined || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find student to get email
    const student = await Student.findOne({ name: studentName });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // ✅ Extract squad number from email (supports both formats)
    const squadNo = getSquadFromEmail(student.email);
    if (!squadNo) {
      console.error("❌ Invalid email format:", student.email);
      return res.status(400).json({ message: "Invalid student email format" });
    }

    // ✅ Create a new record
    const newProgress = new WorkProgress({
      studentName,
      squadNo,
      belt,
      solved,
      date,
    });

    await newProgress.save();
    res.json({ message: "✅ Progress saved successfully", data: newProgress });

  } catch (error) {
    console.error("❌ Error saving progress:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Fetch progress for a single student
router.get("/:studentName", async (req, res) => {
  try {
    const { studentName } = req.params;
    const data = await WorkProgress.find({ studentName }).sort({ date: -1 });
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching student progress:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Fetch all students' progress
router.get("/", async (req, res) => {
  try {
    const data = await WorkProgress.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching all progress:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


