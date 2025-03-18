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
          "http://127.0.0.1:8000/api/auth/profile/",
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

  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <div className="text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
      <div className="text-left text-gray-700">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phone_number}
        </p>
        <p>
          <strong>Roll No:</strong> {profile.roll_number}
        </p>
        <p>
          <strong>Hostel No:</strong> {profile.hostel_number}
        </p>
      </div>

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
  );
};

export default Profile;
