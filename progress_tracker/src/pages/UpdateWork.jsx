
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const beltLevels = ["Purple", "Blue", "Brown", "General"];

const UpdateWork = () => {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName") || "Student";

  const [selectedBelt, setSelectedBelt] = useState("Purple");
  const [questionsSolved, setQuestionsSolved] = useState("");

  const handleUpdate = () => {
    if (!questionsSolved) {
      alert("⚠️ Please enter how many questions you solved.");
      return;
    }

    const today = new Date().toLocaleDateString();

    
    const progressData = JSON.parse(localStorage.getItem("workProgress") || "{}");

    const updatedData = {
      ...progressData,
      [studentName]: {
        ...(progressData[studentName] || {}),
        [today]: {
          belt: selectedBelt,
          solved: questionsSolved,
        },
      },
    };

    localStorage.setItem("workProgress", JSON.stringify(updatedData));
    alert("✅ Progress updated successfully!");
    setQuestionsSolved("");

    
    navigate("/student-work");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg border border-red-200 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-6">
          Update Work Progress
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Hello, <span className="font-medium text-red-500">{studentName}</span>!  
          Select your belt level and update your solved question count for today.
        </p>

        {/* Belt Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Belt Level
          </label>
          <select
            value={selectedBelt}
            onChange={(e) => setSelectedBelt(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            {beltLevels.map((belt) => (
              <option key={belt} value={belt}>
                {belt}
              </option>
            ))}
          </select>
        </div>

        {/* Questions Solved Input */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Number of Questions Solved
          </label>
          <input
            type="number"
            min="0"
            placeholder="Enter count"
            value={questionsSolved}
            onChange={(e) => setQuestionsSolved(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-red-500 text-white py-2.5 rounded-lg font-medium hover:bg-red-600 transition shadow-md"
        >
          Update Progress
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Made with ❤️ by{" "}
        <span className="text-red-500 font-medium">Kabir Dharshaan</span>
      </p>
    </div>
  );
};

export default UpdateWork;

