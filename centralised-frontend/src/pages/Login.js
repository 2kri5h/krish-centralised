import React, { useState } from "react";
import loginPic from "../assets/login.png";
import { loginUser, registerUser } from "../api/api";

const AuthPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    phone_number: "",
    roll_number: "",
    hostel_number: "",
    password: "",
    password2: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(loginData.email, loginData.password);
      localStorage.setItem("access_token", data.token.access);
      localStorage.setItem("refresh_token", data.token.refresh);
      alert("Logged in successfully");
      window.location.href = "/aboutUs";
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    if (
      registerData.password !== registerData.password2 ||
      !registerData.email ||
      !registerData.name ||
      !registerData.phone_number ||
      !registerData.roll_number
    ) {
      return;
    }

    try {
      await registerUser(registerData);
      alert("Verification email sent. Please check your webmail.");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[80%] md:w-[60%] bg-[#d6d6a8] p-10 rounded-xl shadow-lg flex flex-col md:flex-row relative">
        {/* Small Illustration on Top */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <img src={loginPic} alt="Illustration" className="h-36" />
        </div>

        {/* Left Side - LOGIN */}
        <div className="w-full md:w-1/2 px-6">
          <h2 className="text-3xl font-bold text-orange-500 text-center italic">
            LOGIN
          </h2>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-black mb-1">
              Webmail
            </label>
            <input
              type="text"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Eg. 23b3622@iitb.ac.in"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="••••••"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full"
          >
            LOGIN
          </button>

          <p className="mt-4 text-center text-sm">
            Forgot password?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                window.location.href = "/forgotPassword";
              }}
            >
              Click here
            </span>
          </p>
        </div>

        {/* Divider Line */}
        <div className="hidden md:block w-[2.5px] bg-black mx-6 mt-14"></div>

        {/* Right Side - SIGN-UP */}
        <div className="w-full md:w-1/2 px-6 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold text-blue-600 text-center italic">
            SIGN-UP
          </h2>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-black mb-1">
              Webmail
            </label>
            <input
              type="text"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              placeholder="Eg. 23b3622@iitb.ac.in"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={registerData.phone_number}
              onChange={handleRegisterChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Roll Number
            </label>
            <input
              type="text"
              name="roll_number"
              value={registerData.roll_number}
              onChange={handleRegisterChange}
              placeholder="Roll Number"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Hostel Number
            </label>
            <input
              type="text"
              name="hostel_number"
              value={registerData.hostel_number}
              onChange={handleRegisterChange}
              placeholder="Hostel Number"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
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
              value={registerData.password2}
              onChange={handleRegisterChange}
              placeholder="••••••"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full"
          >
            SIGNUP
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
