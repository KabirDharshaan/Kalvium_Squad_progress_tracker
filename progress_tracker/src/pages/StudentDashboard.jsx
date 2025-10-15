
import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProgress = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/work");
        if (!response.ok) {
          const text = await response.text();
          console.error("Failed to fetch all progress:", text);
          setLoading(false);
          return;
        }

        const data = await response.json();

       
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setProgressData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all progress:", error);
        setLoading(false);
      }
    };

    fetchAllProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white border border-red-200 shadow-lg rounded-2xl p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
          All Students Work Progress
        </h1>

        {loading ? (
          <p className="text-gray-600 text-center mt-10">Loading progress...</p>
        ) : progressData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Student Name</th>
                  <th className="px-4 py-3 text-left">Squad</th>
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
                      {entry.studentName}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{entry.squadNo}</td>
                    <td className="px-4 py-3 text-gray-700">{entry.date}</td>
                    <td className="px-4 py-3 text-gray-700">{entry.belt}</td>
                    <td className="px-4 py-3 text-gray-700">{entry.solved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-10">
            📭 No progress records found yet.
          </p>
        )}
      </div>

      
    </div>
  );
};

export default StudentDashboard;







