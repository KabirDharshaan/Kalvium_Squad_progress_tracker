
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp } from "lucide-react";

const Statics = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dailyData, setDailyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [totalSolved, setTotalSolved] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [averageStreak, setAverageStreak] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://kalvium-squad-progress-tracker.onrender.com/api/work");
        if (!response.ok) {
          throw new Error("Failed to fetch progress");
        }

        const data = await response.json();

        // Sort newest first
        const sortedData = data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split("/");
          const [dayB, monthB, yearB] = b.date.split("/");
          return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
        });

        setProgressData(sortedData);
        processStats(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const processStats = (data) => {
    if (!data.length) return;

    // ✅ Total Problems Solved
    const total = data.reduce((sum, entry) => sum + (parseInt(entry.solved) || 0), 0);
    setTotalSolved(total);

    // ✅ Active Students (today’s submissions)
    const today = new Date();
    const todayStr = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;

    const activeToday = new Set(
      data.filter((d) => d.date === todayStr).map((d) => d.studentName)
    ).size;
    setActiveStudents(activeToday);

    // ✅ Student-wise total solved
    const studentTotals = {};
    data.forEach((entry) => {
      if (!studentTotals[entry.studentName]) studentTotals[entry.studentName] = 0;
      studentTotals[entry.studentName] += parseInt(entry.solved) || 0;
    });

    const studentArray = Object.entries(studentTotals).map(([name, total]) => ({
      name,
      total,
    }));

    setStudentData(studentArray);

    // ✅ Daily trend (group by date)
    const dailyTotals = {};
    data.forEach((entry) => {
      if (!dailyTotals[entry.date]) dailyTotals[entry.date] = 0;
      dailyTotals[entry.date] += parseInt(entry.solved) || 0;
    });

    const dailyArray = Object.entries(dailyTotals)
      .map(([date, solved]) => ({ date, solved }))
      .sort((a, b) => {
        const [d1, m1, y1] = a.date.split("/");
        const [d2, m2, y2] = b.date.split("/");
        return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
      });

    setDailyData(dailyArray);

    // ✅ Average daily streak (average solved/day)
    const avg =
      dailyArray.length > 0
        ? (total / dailyArray.length).toFixed(1)
        : 0;
    setAverageStreak(avg);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {loading ? (
        <p className="text-center text-gray-600 mt-10">Loading statistics...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Line Chart - Daily Trend */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">
                Daily Problem Solving Trend
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="solved"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Real-time daily progress trend
              </p>
            </div>

            {/* Bar Chart - Student Comparison */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">
                Student Performance Comparison
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={studentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#EF4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Total problems solved by each student
              </p>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-500 text-white rounded-2xl p-6 flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm">Total Problems Solved</p>
                <h3 className="text-2xl font-bold mt-1">{totalSolved}</h3>
              </div>
              <div className="bg-red-600 p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-2xl p-6 flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm">Active Students Today</p>
                <h3 className="text-2xl font-bold mt-1">{activeStudents}</h3>
              </div>
              <div className="bg-gray-800 p-3 rounded-full">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-green-500 text-white rounded-2xl p-6 flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm">Average Daily Streak</p>
                <h3 className="text-2xl font-bold mt-1">{averageStreak}</h3>
              </div>
              <div className="bg-green-600 p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Statics;
