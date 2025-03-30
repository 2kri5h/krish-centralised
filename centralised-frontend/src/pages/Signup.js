import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../apiclient/apiclient";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    try {
      // Use query parameter for action
      const response = await apiClient.post("/auth/?action=register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone, // Make sure field names match backend
        roll_number: formData.roll_number,
        hostel_number: formData.hostel_number,
      });

      if (response.data.success) {
        // Redirect to login after successful registration
        navigate("/login", { 
          state: { message: "Registration successful! Please login with your credentials." } 
        });
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.error || 
        "Registration failed. Please check your information and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-orange-500 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-white font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-white font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Create a password"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-white font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <label htmlFor="roll_number" className="block text-white font-medium mb-2">
              Roll Number
            </label>
            <input
              type="text"
              id="roll_number"
              name="roll_number"
              value={formData.roll_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your roll number"
            />
          </div>
          
          <div>
            <label htmlFor="hostel_number" className="block text-white font-medium mb-2">
              Hostel Number
            </label>
            <input
              type="text"
              id="hostel_number"
              name="hostel_number"
              value={formData.hostel_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your hostel number"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 font-medium disabled:opacity-50 mt-6"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 