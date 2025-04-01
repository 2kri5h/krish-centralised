import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log(`Verifying email with uid: ${uid}, token: ${token}`);
        const response = await axios.get(`/api/auth/verify/${uid}/${token}/`);
        
        setStatus('success');
        setMessage(response.data.message);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login?verified=true');
        }, 3000);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus('error');
        setMessage(error.response?.data?.error || 'Verification failed');
      }
    };

    verifyEmail();
  }, [uid, token, navigate]);

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

export default VerifyEmail; 