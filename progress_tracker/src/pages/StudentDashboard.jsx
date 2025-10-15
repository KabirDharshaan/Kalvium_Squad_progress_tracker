

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName") || "Student";
  const squadNumber = localStorage.getItem("squadNumber") || "Unknown Squad"; 

  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/work/${studentName}`);
        if (!response.ok) {
          const text = await response.text();
          console.error("Failed to fetch progress:", text);
          setLoading(false);
          return;
        }
        const data = await response.json();

        // Sort data by date descending
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setProgressData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setLoading(false);
      }
    };

    fetchProgress();
  }, [studentName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white border border-red-200 shadow-lg rounded-2xl p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">
              {studentName}'s Dashboard
            </h1>
            <p className="text-gray-700">Squad: {squadNumber}</p>
          </div>

          <button
            onClick={() => navigate("/student-work")}
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition font-medium mt-4 md:mt-0"
          >
            ← Back to Student Work
          </button>
        </div>

        {/* Progress Table */}
        {loading ? (
          <p className="text-gray-600 text-center mt-10">Loading progress...</p>
        ) : progressData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Belt Level</th>
                  <th className="px-4 py-3 text-left">Questions Solved</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((entry, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-red-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {entry.date}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{entry.belt}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {entry.solved} Questions
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-10">
            📭 No progress records found yet. Update your work to see progress here.
          </p>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Made with ❤️ by{" "}
        <span className="text-red-500 font-medium">Kabir Dharshaan</span>
      </p>
    </div>
  );
};

export default StudentDashboard;
