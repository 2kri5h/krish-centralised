import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  console.log("Profile user:", user);
  console.log("Auth state:", { user, loading });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="profile-error">
        <p>No user found. Please log in.</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        
        <div className="profile-details">
          <div className="profile-field">
            <label>Name:</label>
            <p>{user.name}</p>
          </div>
          
          <div className="profile-field">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
          
          {user.phone_number && (
            <div className="profile-field">
              <label>Phone:</label>
              <p>{user.phone_number}</p>
            </div>
          )}
          
          {user.roll_number && (
            <div className="profile-field">
              <label>Roll Number:</label>
              <p>{user.roll_number}</p>
            </div>
          )}
          
          {user.hostel_number && (
            <div className="profile-field">
              <label>Hostel:</label>
              <p>{user.hostel_number}</p>
            </div>
          )}
        </div>
        
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
