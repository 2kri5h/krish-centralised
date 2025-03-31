import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWebsites, setShowWebsites] = useState(false);
  const isLoggedIn = localStorage.getItem("access_token");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    window.open(url, "_blank");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const AuthButtons = ({ isMobile }) => {
    if (user) {
      // User is logged in, show profile and logout options
      return (
        <div className={isMobile ? "mobile-auth-buttons" : "auth-buttons"}>
          <Link
            to="/profile"
            className={isMobile ? "block py-2 hover:text-[#6EACDA]" : "text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className={isMobile ? "block py-2 hover:text-[#6EACDA] text-left w-full" : "text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"}
          >
            Logout
          </button>
        </div>
      );
    }

    // User is not logged in, show login and signup options
    return (
      <div className={isMobile ? "mobile-auth-buttons" : "auth-buttons"}>
        <Link
          to="/login"
          className={isMobile ? "block py-2 hover:text-[#6EACDA]" : "text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={isMobile ? "block py-2 hover:text-[#6EACDA]" : "text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"}
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-black py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <img src={logo} alt="Sarc Logo" className="h-8 w-auto" />

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
            <li
              className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors cursor-pointer"
              style={{ listStyle: "none" }}
            >
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
          <AuthButtons />
          <Link
            to="/contact"
            className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors"
          >
            Contact us
          </Link>
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

          {/* Authentication Buttons - Mobile */}
          <div className="mt-4 space-y-2 px-4">
            <AuthButtons isMobile={true} />
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
                className={`py-1 px-4 ${
                  site.url ? "text-[#6EACDA]" : "text-gray-500"
                }`}
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
