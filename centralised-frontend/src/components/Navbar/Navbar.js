import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWebsites, setShowWebsites] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set active link based on current path
  useEffect(() => {
    const path = location.pathname;
    setMenuOpen(path.substring(1) === 'home');
  }, [location]);

  // Website data with their URLs
  const websiteLinks = [
    { name: "ILP", url: "https://ilpsummer.sarc-iitb.org" },
    { name: "PMP", url: "https://pmp.sarc-iitb.org" },
    { name: "ASMP", url: "https://asmp.sarc-iitb.org" },
    { name: "NTP", url: "https://ntp.sarc-iitb.org" },
    // { name: "PHONATHON ANDROID APP", url: null },
    { name: "SARC CENTRALIZED WEBSITE", url: window.location.origin },
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
    setShowProfileMenu(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setShowProfileMenu(false);
  };

  return (
    <nav ref={navRef} className={`legacy-navbar bg-black py-4 ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="Sarc Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/initiatives"
            className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors"
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
              className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors cursor-pointer"
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
            className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors"
          >
            Gallery
          </Link>
          <Link
            to="/alumni-advice"
            className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors"
          >
            Alumni Advice
          </Link>
          <Link
            to="/contact"
            className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors"
          >
            Contact us
          </Link>

          {/* Authentication Buttons - Desktop */}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-[#e2e2b6] text-md hover:text-[#ff6b2b] transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Logout</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
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
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/initiatives"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={closeMenu}
          >
            Initiatives
          </Link>
          <Link
            to="/gallery"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={closeMenu}
          >
            Gallery
          </Link>
          <Link
            to="/alumni-advice"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={closeMenu}
          >
            Alumni Advice
          </Link>
          <Link
            to="/contact"
            className="block py-2 hover:text-[#6EACDA]"
            onClick={closeMenu}
          >
            Contact us
          </Link>

          {/* Authentication Buttons - Mobile */}
          <div className="mt-4 space-y-2 px-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/signup"
                  className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  onClick={toggleProfileMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Logout</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Add websites list for mobile */}
          <div className="py-2">
            <div className="font-semibold mb-2">Websites</div>
            {websiteLinks.map((site, index) => (
              <div
                key={index}
                onClick={() => {
                  handleWebsiteClick(site.url);
                  closeMenu();
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
