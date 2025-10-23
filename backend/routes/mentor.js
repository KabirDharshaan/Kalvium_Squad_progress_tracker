const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) return res.status(400).json({ message: "Mentor already exists" });

    const mentor = new Mentor({ name, email, password });
    await mentor.save();

    const token = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ token, mentor: { id: mentor._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const mentor = await Mentor.findOne({ email });
    if (!mentor) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await mentor.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, mentor: { id: mentor._id, name: mentor.name, email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;









