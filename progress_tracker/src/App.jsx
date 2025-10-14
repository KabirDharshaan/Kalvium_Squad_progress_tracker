
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MentorLogin from "./pages/MentorLogin";
import MentorSignup from "./pages/MentorSignup";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<Home />} />

         
          <Route path="/mentor-login" element={<MentorLogin />} />

         
          <Route path="/mentor-signup" element={<MentorSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







