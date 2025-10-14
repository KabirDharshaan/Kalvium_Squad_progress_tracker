


import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Code, TrendingUp, Users, Heart } from "lucide-react";
import bgImage from "../assets/IT-firms-aims-to-call-back-some-employees-to-office-starting-September.jpg";
import codingImage from "../assets/images.jpeg";

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center w-full h-[500px] bg-cover bg-center overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-sm font-medium tracking-wide text-gray-300 mb-2">
            LeetCode Progress Tracker
          </h2>
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">
            Empowering Kalvium Students Through Continuous Learning
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Student Login */}
            <button
              onClick={() => navigate("/student-login")}
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:bg-red-600 transition"
            >
              <User size={18} />
              Login as Student
            </button>

            {/* Mentor Login */}
            <button
              onClick={() => navigate("/mentor-login")}
              className="flex items-center gap-2 bg-white text-red-500 px-5 py-2.5 rounded-full font-medium shadow-md hover:bg-gray-100 transition"
            >
              <Code size={18} />
              Login as Mentor
            </button>
          </div>
        </div>
      </section>

      {/* Track Coding Journey Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 bg-gray-50 p-10 rounded-3xl shadow-md mx-6 my-10">
        <div className="flex-1 text-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Track Your Coding Journey
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our platform helps you monitor your progress, complete daily challenges,
            and achieve your coding goals with structured learning paths tailored
            for Kalvium students.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <TrendingUp className="text-red-500" />
              </div>
              <p className="text-gray-800 font-medium">Real-time Progress Analytics</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <Code className="text-red-500" />
              </div>
              <p className="text-gray-800 font-medium">Daily LeetCode Challenges</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <Users className="text-red-500" />
              </div>
              <p className="text-gray-800 font-medium">Mentor-Student Collaboration</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src={codingImage}
            alt="Track your coding journey"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-8 rounded-t-3xl shadow-inner">
        <h3 className="text-lg font-semibold text-gray-800">
          Created by <span className="text-red-500">Kabir Dharshaan</span>, Kalvium Squad 81
        </h3>
        <p className="text-gray-600 mt-1">A service for the Kalvium Community</p>

        <div className="flex justify-center items-center gap-2 mt-3 text-gray-700">
          <span>Made with</span>
          <Heart size={18} className="text-red-500 fill-red-500 animate-pulse" />
          <span>
            by <span className="font-medium text-gray-800">Kabir Dharshaan</span> | Kalvium
            Progress Tracker
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
