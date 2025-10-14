
import React from "react";
import { User, Code } from "lucide-react";
import bgImage from "../assets/IT-firms-aims-to-call-back-some-employees-to-office-starting-September.jpg";

const Home = () => {
  return (
    <section
      className="relative flex items-center justify-center w-full h-[500px] bg-cover bg-center overflow-hidden shadow-lg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for dark tint */}
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
          <button className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:bg-red-600 transition">
            <User size={18} />
            Login as Student
          </button>

          <button className="flex items-center gap-2 bg-white text-red-500 px-5 py-2.5 rounded-full font-medium shadow-md hover:bg-gray-100 transition">
            <Code size={18} />
            Login as Mentor
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
