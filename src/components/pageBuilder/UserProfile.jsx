import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UserProfile.css";

export default function UserProfile() {
  const { userId } = useParams(); // Retrieve userId from URL
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing in the URL.");
      setLoading(false);
      return;
    }

    // Fetch user data
    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((response) => {
        setUser(response.data); // Save user data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
        setLoading(false); // Stop loading
      });
  }, [userId]);

  const updateField = (field, value) => {
    setLoading(true); // Start loading
    axios
      .put(`http://localhost:5000/api/users/${userId}`, { [field]: value })
      .then((response) => {
        setUser((prev) => ({ ...prev, [field]: response.data[field] })); // Update state
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error(`Failed to update ${field}:`, err);
        setLoading(false); // Stop loading
      });
  };

  const updateProfileImage = () => {
    const newProfileImage = prompt("Enter the new profile image URL:");
    if (newProfileImage) {
      updateField("profileImage", newProfileImage);
    }
  };

  const updateBannerImage = () => {
    const newBannerImage = prompt("Enter the new banner image URL:");
    if (newBannerImage) {
      updateField("bannerImage", newBannerImage);
    }
  };

  const updateBio = () => {
    const newBio = prompt("Enter your new bio:");
    if (newBio) {
      updateField("bio", newBio);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      {/* Banner Section */}
      <div className="banner">
        <img src={user.bannerImage || "https://picsum.photos/1200/300"} alt="User banner" />
        <button className="edit-button" onClick={updateBannerImage}>
          Edit Banner
        </button>
      </div>

      {/* Profile Details Section */}
      <div className="profile-details">
        <div className="profile-picture">
          <img src={user.profileImage || "https://picsum.photos/100"} alt="User profile" />
          <button onClick={updateProfileImage}>
            Change Picture
          </button>
        </div>
        <div className="profile-info">
          <h2>{user.username}</h2>
          <p>{user.bio || "No bio available"}</p>
          <button className="edit-button" onClick={updateBio}>
            Edit Bio
          </button>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="additional-content">
        <div className="content-box">
          <img src="https://picsum.photos/300/200?random=1" alt="Content 1" />
        </div>
        <div className="content-box">
          <img src="https://picsum.photos/300/200?random=2" alt="Content 2" />
        </div>
        <div className="content-box">
          <img src="https://picsum.photos/300/200?random=3" alt="Content 3" />
        </div>
      </div>
    </div>
  );
}
