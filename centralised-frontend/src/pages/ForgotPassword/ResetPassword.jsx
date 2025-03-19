import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [passwordResetData, setPasswordResetData] = useState({
    password: "",
    password2: "",
  });

  const { uid, token } = useParams();

  const handlePasswordResetChange = (e) => {
    setPasswordResetData({
      ...passwordResetData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordReset = async () => {
    if (passwordResetData.password !== passwordResetData.password2) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/auth/password/${uid}/${token}/?action=reset-password`,
        {
          password: passwordResetData.password,
          password2: passwordResetData.password2,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Password reset successfully. Please log in again.");

      window.location.href = "/login";
    } catch (error) {
        console.error("Password reset failed:", error.response?.data || error);
        alert("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-6 py-8 rounded-2xl bg-[#d8d7a0]">
        <h2 className="text-3xl font-bold text-orange-500 text-center italic mb-6">
          Reset Your Password
        </h2>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-black mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={passwordResetData.password}
            onChange={handlePasswordResetChange}
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
            value={passwordResetData.password2}
            onChange={handlePasswordResetChange}
            placeholder="••••••"
            className="w-full px-4 py-2 border border-black rounded-full"
          />
        </div>

        <button
          onClick={handlePasswordReset}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;