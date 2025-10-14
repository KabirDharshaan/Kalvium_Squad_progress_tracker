

import React, { useState } from "react";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/student/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setMessage("✅ Successfully signed up! Redirecting to login...");
      setTimeout(() => {
        navigate("/student-login");
      }, 1500);
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md border border-red-100">
        <h2 className="text-2xl font-semibold text-center text-red-500 mb-6">
          Student Signup
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-3">{message}</p>}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-red-400">
              <User size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full outline-none text-gray-700 bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-red-400">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none text-gray-700 bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-red-400">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full outline-none text-gray-700 bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2.5 rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/student-login")}
            className="text-red-500 font-medium hover:underline"
          >
            Login
          </button>
        </p>

        <p className="text-center text-sm text-gray-500 mt-4">
          Made with ❤️ by <span className="text-red-500 font-medium">Kabir Dharshaan</span>
        </p>
      </div>
    </div>
  );
};

export default StudentSignup;
