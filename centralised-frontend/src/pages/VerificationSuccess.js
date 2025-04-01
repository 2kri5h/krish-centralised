import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerificationSuccess.css';

const VerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="verification-success-container">
      <div className="verification-success-card">
        <div className="success-icon">✓</div>
        <h1>Email Verified Successfully!</h1>
        <p>Your account has been activated. You will be redirected to the login page shortly.</p>
        <button 
          className="login-now-button"
          onClick={() => navigate('/login')}
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default VerificationSuccess; 