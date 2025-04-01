import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthButtons.css';

const AuthButtons = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="auth-buttons">
      {isAuthenticated ? (
        <div className="auth-container">
          <Link to="/profile" className="auth-button profile-btn">
            Profile
          </Link>
          <span className="auth-divider">|</span>
          <button className="auth-button logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-container">
          <Link to="/signup" className="auth-button signup-btn">
            Sign Up
          </Link>
          <span className="auth-divider">|</span>
          <Link to="/login" className="auth-button login-btn">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons; 