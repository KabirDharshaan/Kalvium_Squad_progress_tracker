import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MentorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

 
  const allowedMentors = [
    { email: "ajay.balasubramaniam@kalvium.community", password: "ajay@kalvium", name: "Ajay Balasubramaniam" },
    { email: "sourabh.kt@kalvium.community", password: "sourabh@s81", name: "Sourabh KT", squad: "81" },
    { email: "sankamithra.m@kalvium.community", password: "sankamithra@s82", name: "Sankamithra M", squad: "82" },
    { email: "ashwin.samuel@kalvium.community", password: "ashwin@134", name: "Ashwin Samuel", squad: "134" },
    { email: "narasimha.s@kalvium.community", password: "narasimha@s61", name: "Narasimha S", squad: "61" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const mentor = allowedMentors.find(
      (m) => m.email === email && m.password === password
    );

    if (!mentor) {
      setError("Invalid email or password.");

      return;
    }


    localStorage.setItem("mentorToken", "dummy-token");
    localStorage.setItem("mentorName", mentor.name);
    localStorage.setItem("mentorSquad", mentor.squad);

    setMessage("Login successful! Redirecting to update page...");

    setTimeout(() => {
      navigate("/mentor-update");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md border border-red-100">
        <h2 className="text-2xl font-semibold text-center text-red-500 mb-6">
          Mentor Login
        </h2>

        {message && <p className="text-green-500 text-sm mb-3">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
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
                placeholder="Enter your password"
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
            <LogIn size={18} />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorLogin;
