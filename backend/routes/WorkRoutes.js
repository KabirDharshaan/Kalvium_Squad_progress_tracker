const express = require("express");
const router = express.Router();
const WorkProgress = require("../models/WorkProgress");


router.post("/update", async (req, res) => {
  try {
    const { studentName, squadNo, belt, solved, date } = req.body;

    if (!studentName || !belt || solved === undefined || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    let record = await WorkProgress.findOne({ studentName, date });

    if (record) {
      record.belt = belt;
      record.solved = solved;
      record.squadNo = squadNo;
      await record.save();
      return res.json({ message: "Progress updated successfully", record });
    }

    
    const newProgress = new WorkProgress({ studentName, squadNo, belt, solved, date });
    await newProgress.save();

    res.json({ message: "Progress saved successfully", data: newProgress });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ message: error.message });
  }
});


router.get("/:studentName", async (req, res) => {
  try {
    const { studentName } = req.params;
    const data = await WorkProgress.find({ studentName }).sort({ date: -1 });
    res.json(data);
  } catch (error) {
    console.error("Error fetching student progress:", error);
    res.status(500).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await WorkProgress.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    console.error("Error fetching all progress:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
