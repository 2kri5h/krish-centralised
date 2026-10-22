import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../apiclient/apiclient";
import { motion } from "framer-motion";
import loginImage from "../assets/login.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    roll_number: "",
    hostel_number: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Use query parameter for action
      const response = await apiClient.post("/auth/?action=register-verify-email", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone, // Make sure field names match backend
        roll_number: formData.roll_number,
        hostel_number: formData.hostel_number,
      });

      if (response.data.message) {
        // Show success message
        setSuccess("Email sent successfully! Please check your webmail to verify your account.");

        // Clear form data
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          roll_number: "",
          hostel_number: "",
        });

        // Don't navigate immediately, let user see the success message
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);

      // Handle specific error messages from backend
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.errors?.email) {
        setError(`Email error: ${err.response.data.errors.email[0]}`);
      } else if (err.response?.data?.errors?.password) {
        setError(`Password error: ${err.response.data.errors.password[0]}`);
      } else if (err.response?.data?.errors?.non_field_errors) {
        setError(err.response.data.errors.non_field_errors[0]);
      } else {
        setError(
          "Registration failed. Please check your information and try again."
        );
      }
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
          alt="Signup"
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
            Create Account
          </motion.h2>

          {error && (
            <motion.div
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields with animations */}
            {[
              { name: "name", type: "text", placeholder: "Full Name" },
              { name: "email", type: "email", placeholder: "LDAP ID" },
              { name: "password", type: "password", placeholder: "Password" },
              { name: "phone", type: "tel", placeholder: "Phone Number" },
              { name: "roll_number", type: "text", placeholder: "Roll Number" },
              { name: "hostel_number", type: "text", placeholder: "Hostel Number" },
            ].map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 mt-6"
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-400 hover:text-orange-300 transition-colors">
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
