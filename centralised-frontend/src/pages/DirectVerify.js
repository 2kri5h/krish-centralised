import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VerifyEmail.css';

const DirectVerify = () => {
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyDirectly = async () => {
      try {
        // Extract uid and token from URL
        const url = window.location.pathname;
        const parts = url.split('/');
        
        // The URL format should be /verify/{uid}/{token}
        if (parts.length >= 4 && parts[1] === 'verify') {
          const uid = parts[2];
          const token = parts[3];
          
          console.log(`Direct verification with uid: ${uid}, token: ${token}`);
          
          // Call the API to verify
          const response = await axios.get(`/api/auth/verify/${uid}/${token}/`);
          
          setStatus('success');
          setMessage(response.data.message);
          
          // Redirect to login page after 3 seconds
          setTimeout(() => {
            navigate('/login?verified=true');
          }, 3000);
        } else {
          throw new Error('Invalid verification URL');
        }
      } catch (error) {
        console.error("Direct verification error:", error);
        setStatus('error');
        setMessage(error.response?.data?.error || 'Verification failed');
      }
    };

    verifyDirectly();
  }, [navigate]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        {status === 'loading' && (
          <>
            <div className="verify-spinner"></div>
            <h2>Verifying your email...</h2>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="verify-success">✓</div>
            <h2>Email Verified!</h2>
            <p>{message}</p>
            <p>Redirecting to login page...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="verify-error">✗</div>
            <h2>Verification Failed</h2>
            <p>{message}</p>
            <button 
              className="verify-button"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DirectVerify; 