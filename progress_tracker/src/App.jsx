
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";


import MentorLogin from "./pages/MentorLogin";
import MentorSignup from "./pages/MentorSignup";
import MentorUpdate from "./pages/MentorUpdate";


import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import StudentWork from "./pages/StudentWork";
import UpdateWork from "./pages/UpdateWork";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* Mentor */}
          <Route path="/mentor-login" element={<MentorLogin />} />
          <Route path="/mentor-signup" element={<MentorSignup />} />
          <Route path="/mentor-update" element={<MentorUpdate />} />

          {/* Student */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/student-work" element={<StudentWork />} />
          <Route path="/update-work" element={<UpdateWork />} /> {/* ✅ New Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

