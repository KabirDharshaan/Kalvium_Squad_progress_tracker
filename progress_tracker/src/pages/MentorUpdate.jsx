
import React, { useState } from "react";

const beltLevels = ["Purple", "Blue", "Brown", "General"];

const MentorUpdate = () => {
  const mentorName = localStorage.getItem("mentorName") || "Mentor";
  const [questions, setQuestions] = useState(() => {
    // Load existing questions from localStorage if available
    const saved = localStorage.getItem("beltQuestions");
    return saved
      ? JSON.parse(saved)
      : {
          Purple: Array(5).fill(""),
          Blue: Array(5).fill(""),
          Brown: Array(5).fill(""),
          General: Array(5).fill(""),
        };
  });

  const handleChange = (belt, index, value) => {
    setQuestions((prev) => ({
      ...prev,
      [belt]: prev[belt].map((q, i) => (i === index ? value : q)),
    }));
  };

  const handleSave = () => {
    localStorage.setItem("beltQuestions", JSON.stringify(questions));
    alert("✅ Questions updated successfully! Students can now see them.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white border border-red-200 shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Welcome, {mentorName} 👋
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Update 5 LeetCode question links for each belt level below.
        </p>

        {beltLevels.map((belt) => (
          <div key={belt} className="mb-10">
            <h2 className="text-xl font-semibold text-red-600 mb-3 border-b-2 border-red-200 pb-1">
              {belt} Belt Questions (LeetCode links)
            </h2>
            <div className="space-y-3">
              {questions[belt].map((q, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Question ${index + 1} Link`}
                  value={q}
                  onChange={(e) => handleChange(belt, index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              ))}
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={handleSave}
            className="bg-red-500 text-white py-2.5 px-8 rounded-lg font-medium hover:bg-red-600 transition shadow-md"
          >
            Update Questions
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Made with ❤️ by <span className="text-red-500 font-medium">Kabir Dharshaan</span>
      </p>
    </div>
  );
};

export default MentorUpdate;
