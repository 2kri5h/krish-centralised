import React, { useState } from "react";
import { forgotPassword } from "../../api/api";

const ForgotPassword = () => {
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "" });

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordData.email) {
      return;
    }

    try {
      await forgotPassword(forgotPasswordData);
      alert("Password resent email sent. Please check your webmail.");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div>Enter your webmail</div>
      <div className="mt-6">
        <label className="block text-sm font-semibold text-black mb-1">
          Webmail
        </label>
        <input
          type="text"
          name="email"
          value={forgotPasswordData.email}
          onChange={handleForgotPasswordChange}
          placeholder="Eg. 23b3622@iitb.ac.in"
          className="w-full px-4 py-2 border border-black rounded-full"
        />
      </div>

      <button
        onClick={handleForgotPassword}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full"
      >
        Send email
      </button>
    </>
  );
};

export default ForgotPassword;