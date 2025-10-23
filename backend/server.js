const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Import Routes
const mentorRoutes = require("./routes/mentor");
const studentRoutes = require("./routes/studentRoutes");
const workRoutes = require("./routes/WorkRoutes"); 

// ✅ Use Routes
app.use("/api/mentor", mentorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/work", workRoutes);

console.log("✅ /api/work routes registered");


app.get("/", (req, res) => {
  res.send("🚀 Student Tracker API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



