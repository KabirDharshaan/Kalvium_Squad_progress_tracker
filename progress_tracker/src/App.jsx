


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// Mentor Pages
import MentorLogin from "./pages/MentorLogin";
import MentorSignup from "./pages/MentorSignup";
import MentorUpdate from "./pages/MentorUpdate";

// Student Pages
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import StudentWork from "./pages/StudentWork"; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Mentor */}
          <Route path="/mentor-login" element={<MentorLogin />} />
          <Route path="/mentor-signup" element={<MentorSignup />} />
          <Route path="/mentor-update" element={<MentorUpdate />} />

          {/* Student */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/student-work" element={<StudentWork />} /> {/* Added StudentWork route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
