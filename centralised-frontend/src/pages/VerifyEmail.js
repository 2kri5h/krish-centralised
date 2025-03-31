import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/api';
import { motion } from 'framer-motion';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await verifyEmail(uid, token);
        setStatus('success');
        setMessage(response.message || 'Your email has been verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.error || 'Verification failed. Please try again or contact support.');
      }
    };

    confirmEmail();
  }, [uid, token]);

  return (
    <div className="verify-email-container">
      <motion.div 
        className="verify-email-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {status === 'verifying' && (
          <div className="verifying">
            <div className="spinner"></div>
            <h2>Verifying Your Email</h2>
            <p>Please wait while we verify your email address...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="success">
            <div className="success-icon">✓</div>
            <h2>Email Verified</h2>
            <p>{message}</p>
            <motion.button 
              className="login-btn"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Login
            </motion.button>
          </div>
        )}

        {status === 'error' && (
          <div className="error">
            <div className="error-icon">✗</div>
            <h2>Verification Failed</h2>
            <p>{message}</p>
            <motion.button 
              className="retry-btn"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Login
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail; 