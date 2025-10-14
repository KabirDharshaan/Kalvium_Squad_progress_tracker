

import React, { useState } from "react";
import {
  Home,
  Users,
  LayoutDashboard,
  BarChart,
  FileCheck,
  Info,
  Menu,
  X,
} from "lucide-react";
import kalviumLogo from "../assets/fav.png";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Students", icon: <Users size={20} /> },
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Statistics", icon: <BarChart size={20} /> },
    { name: "Proof", icon: <FileCheck size={20} /> },
    { name: "About", icon: <Info size={20} /> },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Left - Logo */}
        <div className="flex items-center space-x-3">
          <img src={kalviumLogo} alt="Kalvium Logo" className="w-10 h-10" />
          <h1 className="text-xl font-semibold text-gray-800">Kalvium</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center space-x-2 cursor-pointer transition-colors duration-200 ${
                active === item.name
                  ? "text-red-500 font-semibold"
                  : "text-gray-700 hover:text-red-400"
              }`}
              onClick={() => setActive(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-white border-t border-gray-200 rounded-lg shadow-md">
          <ul className="flex flex-col space-y-3 py-3 px-4">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center space-x-3 cursor-pointer transition-colors duration-200 ${
                  active === item.name
                    ? "text-red-500 font-semibold"
                    : "text-gray-700 hover:text-red-400"
                }`}
                onClick={() => {
                  setActive(item.name);
                  setMenuOpen(false);
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
