import React from 'react';
import loginPic from '../assets/login.png';

const AuthPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[80%] md:w-[60%] bg-[#d6d6a8] p-10 rounded-xl shadow-lg flex flex-col md:flex-row relative">
        
        {/* Small Illustration on Top */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <img src={loginPic} alt="Illustration" className="h-36" />
        </div>

        {/* Left Side - LOGIN */}
        <div className="w-full md:w-1/2 px-6">
          <h2 className="text-3xl font-bold text-orange-500 text-center italic">LOGIN</h2>
          
          <div className="mt-6">
            <label className="block text-sm font-semibold text-black mb-1">Username</label>
            <input 
              type="text" 
              placeholder="Eg. 23b3622@iitb.ac.in" 
              className="w-full px-4 py-2 border border-black rounded-full focus:ring focus:ring-orange-400"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-black rounded-full focus:ring focus:ring-orange-400"
            />
          </div>
          
          <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full">
            LOGIN
          </button>
        </div>

        {/* Divider Line */}
        <div className="hidden md:block w-[2.5px] bg-black mx-6 mt-14" ></div>

        {/* Right Side - SIGN-UP */}
        <div className="w-full md:w-1/2 px-6 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold text-blue-600 text-center italic">SIGN-UP</h2>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-black mb-1">Create a Username</label>
            <input 
              type="text" 
              placeholder="Eg. 23b3622@iitb.ac.in"
              className="w-full px-4 py-2 border border-black rounded-full focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">Name</label>
            <input 
              type="text" 
              placeholder="Your Full Name"
              className="w-full px-4 py-2 border border-black rounded-full focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">E-mail ID / Phone Number</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-black rounded-full focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">Roll Number</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-black rounded-full focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">Hostel Number</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-black rounded-full focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-black rounded-full focus:ring focus:ring-blue-400"
            />
          </div>

          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full">
            SIGNUP
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
