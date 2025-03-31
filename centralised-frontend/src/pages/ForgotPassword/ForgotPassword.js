import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { forgotPassword } from '../../api/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await forgotPassword({ email });
      setIsSuccess(true);
      setMessage(response.message || 'Password reset email sent successfully. Please check your email.');
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.errors?.email || error.error || 'Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <motion.div 
        className="forgot-password-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Forgot Password</h2>
        
        {isSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>{message}</p>
            <motion.button 
              className="back-to-login-btn"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Login
            </motion.button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
              />
            </div>
            
            {message && <div className="error-message">{message}</div>}
            
            <motion.button 
              type="submit"
              className="submit-btn"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Sending...' : 'Reset Password'}
            </motion.button>
            
            <div className="form-footer">
              <p>
                Remember your password? <span onClick={() => navigate('/login')}>Login</span>
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword; 