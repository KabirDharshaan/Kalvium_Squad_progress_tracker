
import React, { useState } from "react";

// Sample students data
const students = [
  { name: "Kabir", leetCodeUsername: "dharshaan_007" },
  { name: "Ria", leetCodeUsername: "ria123" },
  { name: "Arjun", leetCodeUsername: "arjun456" },
];

const LeetCodeDashboard = () => {
  // Set default theme to "dark"
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleStudentClick = (username) => {
    // Correct LeetCode profile URL
    window.open(`https://leetcode.com/u/${username}/`, "_blank");
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">LeetCode Dashboard</h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded transition-all duration-300 ${
            theme === "light"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
        >
          Toggle Theme
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div
            key={index}
            onClick={() => handleStudentClick(student.leetCodeUsername)}
            className={`cursor-pointer p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
              theme === "light"
                ? "bg-gray-100 hover:bg-gray-200"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-sm mt-1">@{student.leetCodeUsername}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeetCodeDashboard;
