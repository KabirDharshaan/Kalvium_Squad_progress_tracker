
import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedSquad, setSelectedSquad] = useState("");
  const [selectedBelt, setSelectedBelt] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

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

       
        const sortedData = data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split("/");
          const [dayB, monthB, yearB] = b.date.split("/");
          return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
        });

        setProgressData(sortedData);
        setFilteredData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all progress:", error);
        setLoading(false);
      }
    };

    fetchAllProgress();
  }, []);

  // Handle filtering
  useEffect(() => {
    let tempData = [...progressData];

    if (selectedSquad) {
      tempData = tempData.filter(
        (entry) => entry.squadNo.toString() === selectedSquad
      );
    }

    if (selectedBelt) {
      tempData = tempData.filter((entry) => entry.belt === selectedBelt);
    }

    if (selectedDate) {
      // Convert selectedDate (YYYY-MM-DD) to Date object
      const [year, month, day] = selectedDate.split("-");
      const selectedDateObj = new Date(year, month - 1, day);

      tempData = tempData.filter((entry) => {
        const [d, m, y] = entry.date.split("/"); // DD/MM/YYYY
        const entryDateObj = new Date(y, m - 1, d);
        return entryDateObj.getTime() === selectedDateObj.getTime();
      });
    }

    setFilteredData(tempData);
  }, [selectedSquad, selectedBelt, selectedDate, progressData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white border border-red-200 shadow-lg rounded-2xl p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
          All Students Work Progress
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Squad number"
            value={selectedSquad}
            onChange={(e) => setSelectedSquad(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />

          <select
            value={selectedBelt}
            onChange={(e) => setSelectedBelt(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">All Belts</option>
            <option value="Purple">Purple</option>
            <option value="Blue">Blue</option>
            <option value="Brown">Brown</option>
            <option value="General">General</option>
          </select>

          <button
            onClick={() => {
              setSelectedDate("");
              setSelectedSquad("");
              setSelectedBelt("");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Reset Filters
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 text-center mt-10">Loading progress...</p>
        ) : filteredData.length > 0 ? (
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
                {filteredData.map((entry, index) => (
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
            📭 No progress records found with these filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
