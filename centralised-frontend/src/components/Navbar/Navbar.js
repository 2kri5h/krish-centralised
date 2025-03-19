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
    window.open(url, "_blank");
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
              <div className="websites-dropdown absolute top-full left-0 bg-[#F5F0D7] border border-black rounded-lg p-4 min-w-[250px] shadow-lg">
                <h2 className="text-[#e2e2b6] font-semibold mb-3">WEBSITES</h2>
                <div className="websites-list space-y-2">
                  {websiteLinks.map((site, index) => (
                    <div
                      key={index}
                      onClick={() => handleWebsiteClick(site.url)}
                      className={`website-link p-2 rounded-lg cursor-pointer transition-colors
                                ${
                                  site.url
                                    ? "hover:bg-blue-100"
                                    : "opacity-60 cursor-not-allowed"
                                }
                                border border-black`}
                    >
                      <span className="website-box flex justify-between items-center">
                        <span>{site.name}</span>
                        {site.url && site.url !== window.location.origin && (
                          <span>↗</span>
                        )}
                      </span>
                    </div>
                  ))}
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
          {!localStorage.getItem("access_token") ? (
            <div className="flex items-center bg-orange-500 hover:bg-orange-600 text-white rounded-lg overflow-hidden">
              <Link to="/signup" className="px-4 py-2 text-sm font-semibold">
                Sign Up
              </Link>
              <span className="text-white">|</span>
              <Link to="/login" className="px-4 py-2 text-sm font-semibold">
                Login
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("access_token");
                window.location.href = "/";
              }}
              className="logout-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              <div class="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>

              <div class="text">Logout</div>
            </button>
          )}
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
