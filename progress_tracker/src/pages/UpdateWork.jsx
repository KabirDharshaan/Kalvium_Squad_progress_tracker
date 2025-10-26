

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const beltLevels = ["Purple", "Blue", "Brown", "General"];

const UpdateWork = () => {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName") || "Student";

  const [selectedBelt, setSelectedBelt] = useState("Purple");
  const [questionsSolved, setQuestionsSolved] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!questionsSolved) {
      alert("⚠️ Please enter how many questions you solved.");
      return;
    }

    // Format date as DD/MM/YYYY
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB");

    const progressData = {
      studentName,
      belt: selectedBelt,
      solved: questionsSolved,
      date: formattedDate,
    };

    try {
      setLoading(true);
      const response = await fetch("https://kalvium-squad-progress-tracker-1.onrender.com/api/work/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("✅ Today's progress updated successfully!");
        setQuestionsSolved("");
        navigate("/student-work");
      } else {
        alert(`❌ Failed to update: ${data.message}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating progress:", error);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg border border-red-200 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-6">
          Update Work Progress
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Hello, <span className="font-medium text-red-500">{studentName}</span>!
          <br />
          Select your belt level and update your solved question count for today.
        </p>

        {/* Belt Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Belt Level</label>
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
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-medium transition shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {loading ? "Updating..." : "Update Progress"}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Made with ❤️ by <span className="text-red-500 font-medium">Kabir Dharshaan</span>
      </p>
    </div>
  );
};

export default UpdateWork;
