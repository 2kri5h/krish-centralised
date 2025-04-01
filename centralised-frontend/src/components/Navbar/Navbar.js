import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="SARC Logo" className="logo-img" />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-links ${location.pathname === '/' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/aboutUs" 
              className={`nav-links ${location.pathname === '/aboutUs' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/initiatives" 
              className={`nav-links ${location.pathname === '/initiatives' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Initiatives
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/alum" 
              className={`nav-links ${location.pathname === '/alum' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Alumni
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/gallery" 
              className={`nav-links ${location.pathname === '/gallery' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/blogs" 
              className={`nav-links ${location.pathname === '/blogs' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/contact" 
              className={`nav-links ${location.pathname === '/contact' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
        
        {/* Add auth buttons to navbar */}
        <div className="auth-buttons-navbar">
          {isAuthenticated ? (
            <div className="auth-container-navbar">
              <Link to="/profile" className="auth-button-navbar profile-btn">
                Profile
              </Link>
              <span className="auth-divider-navbar">|</span>
              <button className="auth-button-navbar logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-container-navbar">
              <Link to="/signup" className="auth-button-navbar signup-btn">
                Sign Up
              </Link>
              <span className="auth-divider-navbar">|</span>
              <Link to="/login" className="auth-button-navbar login-btn">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
