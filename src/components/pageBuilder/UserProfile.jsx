// components/UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";

export default function UserProfile() {
  const [users, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Assuming you have an API endpoint to fetch the user's profile data
    axios
      .get("http://localhost:5000/api/users/profile") // Replace with your API endpoint
      .then((response) => {
        setUser(response.data); // Store the fetched data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load user profile");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile">
      <div className="profile-info">
        <h2>{users.name}</h2>
        <p>{users.bio || "No bio available."}</p>
      </div>
    </div>
  );
}
