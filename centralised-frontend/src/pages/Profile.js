import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Profile.css';

const Profile = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');

  // Log the raw user object to see its structure
  console.log("Profile page - User object:", user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <div className="error-icon">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <p>No user found. Please log in.</p>
        <button 
          className="login-redirect-btn"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <motion.div 
        className="profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
          <div className="profile-name">{user.name || 'User'}</div>
          <div className="profile-email">{user.email || 'No email provided'}</div>
        </div>
        
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button 
            className={`tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
          >
            Academic Info
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'personal' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'personal' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="profile-content"
          >
            {activeTab === 'personal' && (
              <div className="profile-info">
                <div className="info-section">
                  <div className="section-title">Contact Information</div>
                  <div className="profile-field">
                    <div className="field-label">Email</div>
                    <div className="field-value">{user.email || 'Not provided'}</div>
                  </div>
                  <div className="profile-field">
                    <div className="field-label">Phone Number</div>
                    <div className="field-value">{user.phone_number || 'Not provided'}</div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'academic' && (
              <div className="profile-info">
                <div className="info-section">
                  <div className="section-title">Academic Details</div>
                  <div className="profile-field">
                    <div className="field-label">Roll Number</div>
                    <div className="field-value">{user.roll_number || 'Not provided'}</div>
                  </div>
                  <div className="profile-field">
                    <div className="field-label">Hostel Number</div>
                    <div className="field-value">{user.hostel_number || 'Not provided'}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="profile-actions">
          <motion.button 
            // className="edit-profile-btn"
            // onClick={() => navigate('/edit-profile')}
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
          >
            {/* Edit Profile */}
          </motion.button>
          <motion.button 
            className="logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
