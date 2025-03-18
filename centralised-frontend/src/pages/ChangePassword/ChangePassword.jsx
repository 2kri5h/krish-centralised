import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({ password: "", password2: "" })
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePasswordChangeSubmit = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("No access token found. Please log in.");
      return;
    }

    if (passwordData.password !== passwordData.password2) {
        setError("Passwords do not match. Please try again.");
        return;
      }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/password/?action=change",
        {
          password: passwordData.password,
          password2: passwordData.password2,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Password changed successfully.");
      window.location.href = "/profile";
    } catch (err) {
      console.error("Profile fetch error:", err.response?.data || err);
      setError("Failed to load password. Please try again.");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Change Password</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      
      <div className="mt-4">
        <label className="block text-sm font-semibold text-black mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={passwordData.password}
          onChange={handlePasswordChange}
          placeholder="••••••"
          className="w-full px-4 py-2 border border-black rounded-full"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-black mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          name="password2"
          value={passwordData.password2}
          onChange={handlePasswordChange}
          placeholder="••••••"
          className="w-full px-4 py-2 border border-black rounded-full"
        />
      </div>

      <button
        onClick={handlePasswordChangeSubmit}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full"
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;