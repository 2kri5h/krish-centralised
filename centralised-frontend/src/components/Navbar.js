import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Import menu icons
import logo from '../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* Logo */}
        <img src={logo} alt="Sirc Logo" className="h-8 w-auto" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors">
            Home
          </Link>
          <Link to="/initiatives" className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors">
            Initiatives
          </Link>
          <Link to="/websites" className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors">
            Websites
          </Link>
          <Link to="/gallery" className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors">
            Gallery
          </Link>
          <Link to="/blogs" className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors">
            Blogs
          </Link>
          <Link to="/contact" className="text-[#e2e2b6] text-md hover:text-[#6EACDA] transition-colors">
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
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white text-center py-4 absolute top-16 left-0 w-full z-50 shadow-lg">
          <Link to="/" className="block py-2 hover:text-[#6EACDA]" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/initiatives" className="block py-2 hover:text-[#6EACDA]" onClick={() => setMenuOpen(false)}>
            Initiatives
          </Link>
          <Link to="/websites" className="block py-2 hover:text-[#6EACDA]" onClick={() => setMenuOpen(false)}>
            Websites
          </Link>
          <Link to="/gallery" className="block py-2 hover:text-[#6EACDA]" onClick={() => setMenuOpen(false)}>
            Gallery
          </Link>
          <Link to="/blogs" className="block py-2 hover:text-[#6EACDA]" onClick={() => setMenuOpen(false)}>
            Blogs
          </Link>
          <Link to="/contact" className="block py-2 hover:text-[#6EACDA]" onClick={() => setMenuOpen(false)}>
            Contact us
          </Link>

          {/* Sign Up & Login for Mobile */}
          <div className="flex justify-center space-x-3 mt-4">
            <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Sign Up
            </Link>
            <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
