

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const beltLevels = ["Purple", "Blue", "Brown", "General"];

const StudentWork = () => {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName") || "Student";
  const studentSquad = localStorage.getItem("studentSquad") || "unknown";

  const [selectedBelt, setSelectedBelt] = useState("Purple");
  const [questions, setQuestions] = useState({
    Purple: Array(5).fill(""),
    Blue: Array(5).fill(""),
    Brown: Array(5).fill(""),
    General: Array(5).fill(""),
  });

  useEffect(() => {
    // ✅ Load squad-specific questions (handles both .s81@ and .s.134@)
    const savedQuestions = localStorage.getItem(`beltQuestions_squad_${studentSquad}`);
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
  }, [studentSquad]);

  const handleUpdateProgress = () => {
    navigate("/update-work");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center py-10 px-4 relative">
      <button
        onClick={handleUpdateProgress}
        className="absolute top-6 right-6 bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition font-medium"
      >
        Update Work Progress
      </button>

      <div className="bg-white border border-red-200 shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Welcome, {studentName} 👋
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Your squad: {studentSquad}. Select your belt level to view today’s assigned questions.
        </p>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {beltLevels.map((belt) => (
            <button
              key={belt}
              onClick={() => setSelectedBelt(belt)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedBelt === belt
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
            >
              {belt}
            </button>
          ))}
        </div>

        {/* Questions Section */}
        <div className="space-y-4 mb-6">
          {questions[selectedBelt].map((q, index) => (
            <div key={index} className="flex flex-col">
              {q ? (
                <a
                  href={q}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 font-medium hover:underline"
                >
                  Question {index + 1} Link
                </a>
              ) : (
                <p className="text-gray-500">
                  Question {index + 1} not assigned yet
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentWork;
