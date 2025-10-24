

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

const allowedEmails = [
  ".s81@kalvium.community",
  ".s82@kalvium.community",
  ".s61@kalvium.community",
  ".s.134@kalvium.community",
];

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, squadNo } = req.body; // Added squadNo

  try {
    // Check if all required fields are provided
    if (!name || !email || !password || squadNo === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email ends with allowed patterns
    const isAllowed = allowedEmails.some((pattern) => email.endsWith(pattern));
    if (!isAllowed) {
      return res.status(400).json({
        message: "Email not allowed. Use your valid Kalvium community email.",
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Create new student
    const student = new Student({ name, email, password, squadNo });
    await student.save();

    // Create JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      student: { id: student._id, name, email, squadNo },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await student.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      student: { id: student._id, name: student.name, email, squadNo: student.squadNo },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;






