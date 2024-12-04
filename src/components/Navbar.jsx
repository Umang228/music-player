import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center text-white w-full">
      {/* Left Section - Navigation Links */}
      <div className="flex space-x-9 ml-5">
        <span className="cursor-pointer hover:text-red-500">Music</span>
        <span className="cursor-pointer hover:text-red-500">Podcast</span>
        <span className="cursor-pointer hover:text-red-500">Live</span>
        <span className="cursor-pointer hover:text-red-500">Radio</span>
      </div>

      {/* Right Section - Search Bar */}
      <div className="relative mr-5">
        <input
          type="text"
          placeholder="Search..."
          className="p-3 pl-5 pr-12 w-80 h-10 bg-[#3B0C0C] text-white rounded-full focus:outline-none placeholder-gray-400"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
        />
      </div>
    </nav>
  );
};

export default Navbar;
