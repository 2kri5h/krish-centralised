import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyPage = () => {
  const { uid, token } = useParams(); // Get UID and token from URL
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndLogin = async () => {
      try {
        const response = await axios.post(
           `http://127.0.0.1:8000/api/auth/register-verify/${uid}/${token}/?action=register-verify`
        );

        localStorage.setItem("access_token", response.data.token.access);
        localStorage.setItem("refresh_token", response.data.token.refresh);

        setMessage("Verification successful! Logging you in...");

        setTimeout(() => navigate("/aboutUs"), 2000);
      } catch (error) {
        setMessage("Invalid or expired verification link.");
      }
    };

    verifyAndLogin();
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[50%] bg-white p-10 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Email Verification
        </h2>
        <p className="mt-4">{message}</p>
      </div>
    </div>
  );
};

export default VerifyPage;
