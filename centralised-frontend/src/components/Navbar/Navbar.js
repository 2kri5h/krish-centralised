import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWebsites, setShowWebsites] = useState(false);

  // Website data with their URLs
  const websiteLinks = [
    { name: "ILP", url: "https://ilp.sarc-iitb.org" },
    { name: "PMP", url: "https://pmp.sarc-iitb.org" },
    { name: "ASMP", url: "https://asmp.sarc-iitb.org" },
    { name: "NTP", url: "https://ntp.sarc-iitb.org" },
    { name: "PHONATHON ANDROID APP", url: null }, // null means not available
    { name: "SARC CENTRALIZED WEBSITE", url: window.location.origin }, // current website
    { name: "ALUMINATION", url: "https://alumination.sarc-iitb.org" },
    { name: "SARCASM", url: "https://sarcasm.sarc-iitb.org" },
    { name: "YEARBOOK", url: "https://yearbook.sarc-iitb.org" },
  ];

  // Handle website click
  const handleWebsiteClick = (url) => {
    if (!url || url === window.location.origin) {
      // If URL is null or current website, do nothing
      return;
    }
    // Open in new tab
    window.open(url, '_blank');
  };

  return (
    <nav className="bg-black py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <img src={logo} alt="Sirc Logo" className="h-8 w-auto" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/initiatives"
            className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"
          >
            Initiatives
          </Link>
          
          {/* Websites Dropdown */}
          <div
            className="websites-container relative"
            onMouseEnter={() => setShowWebsites(true)}
            onMouseLeave={() => setShowWebsites(false)}
          >
            <li className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors cursor-pointer">
              Websites
            </li>

            {showWebsites && (
  <div className="fixed inset-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-md flex mt-12 justify-center items-center z-50">
    <div className="w-full max-w-6xl p-8">
      <h2 className="text-white font-bold text-5xl mb-8 text-left">WEBSITES</h2>
      <div className="grid grid-cols-2 gap-4">
        {websiteLinks.map((site, index) => (
          <div
            key={index}
            onClick={() => handleWebsiteClick(site.url)}
            className={`p-6 rounded-lg cursor-pointer transition-colors
                        ${site.url ? 'hover:bg-gray-700' : 'opacity-60 cursor-not-allowed'}
                         text-white text-3xl font-bold flex justify-between items-center`}
          >
            <span>{site.name}</span>
            {site.url && site.url !== window.location.origin && (
              <span>↗</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-right mt-8 text-sm">
        click name to redirect to websites
      </p>
    </div>
  </div>
)}
          </div>

          <Link
            to="/gallery"
            className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"
          >
            Gallery
          </Link>
          {/* <Link
            to="/blogs"
            className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"
          >
            Blogs
          </Link> */}
          {localStorage.getItem("access_token") && (
            <Link
              to="/profile"
              className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"
            >
              Profile
            </Link>
          )}
          <Link
            to="/contact"
            className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"
          >
            Contact us
          </Link>

          {/* Sign Up & Login Button */}
          <div className="flex items-center bg-orange-500 hover:bg-orange-600 text-white rounded-lg overflow-hidden">
            <Link to="/signup" className="px-4 py-2 text-sm font-semibold">
              Sign Up
            </Link>
            <span className="text-white">|</span>
            <Link to="/login" className="px-4 py-2 text-sm font-semibold">
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white text-center py-4 absolute top-16 left-0 w-full z-50 shadow-lg">
          <Link
            to="/"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/initiatives"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={() => setMenuOpen(false)}
          >
            Initiatives
          </Link>
          <Link
            to="/gallery"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </Link>
          {/* <Link
            to="/blogs"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </Link> */}
          <Link
            to="/contact"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </Link>

          {/* Sign Up & Login for Mobile */}
          <div className="flex justify-center space-x-3 mt-4">
            <Link
              to="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Login
            </Link>
          </div>

          {/* Add websites list for mobile */}
          <div className="py-2">
            <div className="font-semibold mb-2">Websites</div>
            {websiteLinks.map((site, index) => (
              <div
                key={index}
                onClick={() => {
                  handleWebsiteClick(site.url);
                  setMenuOpen(false);
                }}
                className={`py-1 px-4 ${site.url ? 'text-[#6EACDA]' : 'text-gray-500'}`}
              >
                {site.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
