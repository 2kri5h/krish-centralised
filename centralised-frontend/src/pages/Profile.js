import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone_number: '',
    roll_number: '',
    hostel_number: ''
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
    
    if (user) {
      setProfileData({
        name: user.name || 'Not provided',
        email: user.email || 'Not provided',
        phone_number: user.phone_number || 'Not provided',
        roll_number: user.roll_number || 'Not provided',
        hostel_number: user.hostel_number || 'Not provided'
      });
    }
  }, [user, isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>View and manage your account information</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            {profileData.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="profile-details">
            <div className="profile-info">
              <h2>{profileData.name}</h2>
              <p className="profile-email">{profileData.email}</p>
              
              <div className="profile-data-grid">
                <div className="profile-data-item">
                  <span className="profile-label">Phone Number</span>
                  <span className="profile-value">{profileData.phone_number}</span>
                </div>
                
                <div className="profile-data-item">
                  <span className="profile-label">Roll Number</span>
                  <span className="profile-value">{profileData.roll_number}</span>
                </div>
                
                <div className="profile-data-item">
                  <span className="profile-label">Hostel Number</span>
                  <span className="profile-value">{profileData.hostel_number}</span>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              <button 
                className="profile-button change-password"
                onClick={() => navigate('/changePassword')}
              >
                Change Password
              </button>
              <button 
                onClick={handleLogout}
                className="logout-button bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
