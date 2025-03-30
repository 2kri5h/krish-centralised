import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setError("No access token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "https://centralised.sarc-iitb.org/api/auth/profile/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setProfile(response.data);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err);
        setError("Failed to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <div className="text-gray-500">Loading profile...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[80%] md:w-[60%] bg-[#d6d6a8] p-10 rounded-xl shadow-lg flex md:flex-row relative">
        <div className="w-full px-6 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold text-blue-600 text-center italic">
            PROFILE
          </h2>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-black mb-1">
              Webmail
            </label>
            <input
              type="text"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
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
              value={profile.name}
              onChange={handleProfileChange}
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
              value={profile.phone_number}
              onChange={handleProfileChange}
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
              value={profile.roll_number}
              onChange={handleProfileChange}
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
              value={profile.hostel_number}
              onChange={handleProfileChange}
              placeholder="Hostel Number"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div>

          {/* <div className="mt-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
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
              value={profile.password2}
              onChange={handleProfileChange}
              placeholder="••••••"
              className="w-full px-4 py-2 border border-black rounded-full"
            />
          </div> */}

          {/* <button
            onClick={handleRegister}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full"
          >
            SIGNUP
          </button> */}

          <p className="mt-4 text-center text-sm">
            Want to change Password?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                window.location.href = "/changePassword";
              }}
            >
              Click here
            </span>
          </p>
        </div>
      </div>
    </div>


    // <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    //   <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
    //   <div className="text-left text-gray-700">
    //     <p>
    //       <strong>Name:</strong> {profile.name}
    //     </p>
    //     <p>
    //       <strong>Email:</strong> {profile.email}
    //     </p>
    //     <p>
    //       <strong>Phone:</strong> {profile.phone_number}
    //     </p>
    //     <p>
    //       <strong>Roll No:</strong> {profile.roll_number}
    //     </p>
    //     <p>
    //       <strong>Hostel No:</strong> {profile.hostel_number}
    //     </p>
    //   </div>


    // </div>
  );
};

export default Profile;
