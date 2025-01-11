import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UserProfile.css";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null); // State to store the single post data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(userId); // This will laog the ID to ensure it's being fetched correctly
    axios
      .get(`http://localhost:5000/api/users/67784c8fbd110de3969945a3`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
        setLoading(false);
      });
  }, [userId]);

  const updateField = (field, value) => {
    setLoading(true); // Set loading before making the request
    axios
      .put(`http://localhost:5000/api/users/${user._id}`, { [field]: value })
      .then((response) => {
        setUser((prev) => ({ ...prev, [field]: response.data[field] }));
        setLoading(false); // Stop loading after the update
      })
      .catch((err) => {
        console.error(`Failed to update ${field}:`, err);
        setLoading(false); // Stop loading in case of error
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
        <img src={user.bannerImage} alt="User banner" />
        <button className="edit-button" onClick={updateBannerImage}>
          Edit Banner
        </button>
      </div>

      {/* Profile Details Section */}
      <div className="profile-details">
        <div className="profile-picture">
          <img src={user.profileImage} alt="User profile" />
          <button className="edit-button" onClick={updateProfileImage}>
            Edit Profile Picture
          </button>
        </div>
        <div className="profile-info">
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
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
