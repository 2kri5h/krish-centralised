import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import loginImage from "../assets/login.png";
import './Login.css';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user was redirected from verification page
    const params = new URLSearchParams(location.search);
    if (params.get('verified') === 'true') {
      setSuccessMessage('Email verified successfully! You can now log in.');
    } else if (params.get('verification') === 'failed') {
      setError('Email verification failed. Please try again or contact support.');
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError("Please enter your email address to resend verification");
      return;
    }
    
    setLoading(true);
    try {
      // Call the resend verification API with the correct endpoint
      const response = await axios.post("/api/auth/resend-verification/", {
        email
      });
      
      if (response.status === 200) {
        setError("");
        setSuccessMessage("Verification email sent! Please check your webmail.");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500 filter blur-3xl opacity-30"></div>
        </motion.div>
        <img 
          src={loginImage} 
          alt="Login" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <motion.div 
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome Back
          </motion.h2>

          {successMessage && (
            <motion.div 
              className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {successMessage}
            </motion.div>
          )}

          {error && (
            <motion.div 
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>{error}</p>
              {error.includes("not verified") && (
                <button 
                  onClick={handleResendVerification}
                  className="mt-2 text-orange-400 hover:text-orange-300 text-sm underline"
                >
                  Resend verification email
                </button>
              )}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <motion.input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </div>

            <div>
              <motion.input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300 disabled:opacity-50"
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <motion.div 
            className="mt-8 text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-400 hover:text-orange-300 transition-colors">
                Sign Up
              </Link>
            </p>
            <Link to="/forgot-password" className="text-gray-400 hover:text-gray-300 transition-colors block">
              Forgot Password?
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
