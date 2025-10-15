
import React from "react";
import aboutBg from "../assets/GettyImages-1149958175-1078x516.jpg";
import profileImage from "../assets/1000003779.jpg";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${aboutBg})`,
        }}
      >
        <div className="relative text-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            About This Project
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Empowering Kalvium students and mentors through transparent progress
            tracking
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white shadow-md rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This platform was built by{" "}
            <span className="text-red-500 font-medium">Kabir Dharshaan</span>{" "}
            (Kalvium Squad 81) to empower both mentors and students by tracking
            coding growth transparently. It provides progress analytics,
            assignments, and proof of problem-solving.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This is my contribution to improve productivity and learning culture
            at Kalvium. The platform bridges the gap between student effort and
            mentor oversight, creating a transparent ecosystem where everyone can
            track progress in real time.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By integrating with LeetCode and providing daily challenges based on
            belt levels, we ensure that every student gets personalized learning
            paths that match their current skill level while pushing them to
            improve consistently.
          </p>
        </div>
      </section>

      {/* Profile / Contributor Section */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-red-500 text-white rounded-2xl shadow-md flex flex-col md:flex-row items-center md:items-start gap-6 p-8 md:p-10">
          <img
            src={profileImage}
            alt="Kabir Dharshaan"
            className="w-32 h-32 rounded-full object-cover border-4 border-white"
          />
          <div>
            <h3 className="text-lg font-medium">Kabir Dharshaan</h3>
            <h4 className="text-xl font-semibold mb-2">Kalvium Squad 81</h4>
            <p className="italic mb-3">
              “Building tools that elevate learning.”
            </p>
            <p>
              Passionate about creating solutions that make a difference in
              education and empower fellow students to achieve their coding goals.
            </p>
          </div>
        </div>
      </section>

      {/* Proof of Work & Belt System Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-16 px-6">
        {/* Proof of Work */}
        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 text-2xl">
            👥
          </div>
          <h3 className="text-lg font-semibold mb-2">Proof of Work</h3>
          <p className="text-gray-700">
            Visual collection of solved problems with screenshots and verification.
          </p>
        </div>

        {/* Belt System */}
        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 text-2xl">
            📈
          </div>
          <h3 className="text-lg font-semibold mb-2">Belt System</h3>
          <p className="text-gray-700">
            Gamified learning with White, Yellow, Red, and Black belt progression
            levels.
          </p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-20 px-6">
        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            🎯
          </div>
          <h3 className="text-lg font-semibold mb-2">Progress Analytics</h3>
          <p className="text-gray-700">
            Track student progress with detailed analytics, charts, and real-time
            LeetCode sync.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            💻
          </div>
          <h3 className="text-lg font-semibold mb-2">Daily Assignments</h3>
          <p className="text-gray-700">
            Mentors can assign daily problems tailored to each belt level for
            structured learning.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
