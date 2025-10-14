import React from "react";

const MentorUpdate = () => {
  const mentorName = localStorage.getItem("mentorName") || "Mentor";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 w-full max-w-md shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Welcome, {mentorName}!
        </h1>
        <p className="text-gray-700 mb-6">
          This is your Mentor Update page. You can update your profile or manage students here.
        </p>
        <button className="bg-red-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-red-600 transition">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default MentorUpdate;
