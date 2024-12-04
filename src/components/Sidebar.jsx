import React from "react";
import { FaHome, FaArrowUp, FaMusic, FaCompass, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black text-white p-3 pl-8 h-screen flex flex-col justify-between">
      <div>
        <img
          src="logo.png"
          alt="DreamMusic Logo"
          className="pl-0 w-35 h-18 mt-3 mb-6"
        />
        <p className="text-xs text-gray-400 font-medium mb-1">Menu</p>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3 text-sm hover:text-red-600">
            <FaHome className="text-red-600 text-lg" />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-3 text-sm hover:text-red-600">
            <FaArrowUp className="text-red-600 text-lg" />
            <span>Trends</span>
          </li>
          <li className="flex items-center space-x-3 text-sm hover:text-red-600">
            <FaMusic className="text-red-600 text-lg" />
            <span>Library</span>
          </li>
          <li className="flex items-center space-x-3 text-sm hover:text-red-600">
            <FaCompass className="text-red-600 text-lg" />
            <span>Discover</span>
          </li>
        </ul>
      </div>
      <div className="mb-10">
        <p className="text-xs text-gray-400 font-medium mb-1">General</p>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3 text-sm hover:text-red-600">
            <FaCog className="text-red-600 text-lg" />
            <span>Settings</span>
          </li>
          <li className="flex items-center space-x-3 text-sm hover:text-red-600">
            <FaSignOutAlt className="text-red-600 text-lg" />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
