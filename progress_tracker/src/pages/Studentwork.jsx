

import React, { useState, useEffect } from "react";

const beltLevels = ["Purple", "Blue", "Brown", "General"];

const StudentWork = () => {
  const studentName = localStorage.getItem("studentName") || "Student";
  
  const [selectedBelt, setSelectedBelt] = useState("Purple");
  const [questions, setQuestions] = useState({
    Purple: Array(5).fill(""),
    Blue: Array(5).fill(""),
    Brown: Array(5).fill(""),
    General: Array(5).fill(""),
  });
  const [answers, setAnswers] = useState(Array(5).fill(""));

  useEffect(() => {
    // Load questions from localStorage
    const savedQuestions = localStorage.getItem("beltQuestions");
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));

    // Reset answers when changing belt
    setAnswers(Array(5).fill(""));
  }, [selectedBelt]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
  };

  const handleSaveWork = () => {
    const studentWorks = JSON.parse(localStorage.getItem("studentWorks") || "{}");
    const today = new Date().toLocaleDateString();

    const updatedWorks = {
      ...studentWorks,
      [studentName]: {
        ...(studentWorks[studentName] || {}),
        [today]: {
          belt: selectedBelt,
          answers,
        },
      },
    };

    localStorage.setItem("studentWorks", JSON.stringify(updatedWorks));
    alert("✅ Your work has been saved!");
    setAnswers(Array(5).fill(""));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white border border-red-200 shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Welcome, {studentName} 👋
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Select your belt level and complete today's work by solving the questions below.
        </p>

        {/* Belt Selector */}
        <div className="flex justify-center gap-4 mb-6">
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

        {/* Questions for selected belt */}
        <div className="space-y-4 mb-6">
          {questions[selectedBelt].map((q, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                {q ? (
                  <a href={q} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
                    Question {index + 1} Link
                  </a>
                ) : (
                  `Question ${index + 1} not assigned yet`
                )}
              </label>
              <input
                type="text"
                placeholder="Your solution / notes"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSaveWork}
            className="bg-red-500 text-white py-2.5 px-8 rounded-lg font-medium hover:bg-red-600 transition shadow-md"
          >
            Save Today's Work
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Made with ❤️ by <span className="text-red-500 font-medium">Kabir Dharshaan</span>
      </p>
    </div>
  );
};

export default StudentWork;

