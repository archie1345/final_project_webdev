// components/UserProfile.js
import React from "react";
import "./UserProfile.css";

export default function UserProfile() {
  return (
    <div className="user-profile">
      <div className="banner">
        <img
          src="https://via.placeholder.com/800x200.png?text=Banner"
          alt="Banner"
        />
      </div>
      <div className="profile-details">
        <div className="profile-picture">
          <img
            src="https://via.placeholder.com/100.png?text=Profile"
            alt="Profile"
          />
        </div>
        <div className="profile-info">
          <h2>Username</h2>
          <p>User bio.</p>
        </div>
      </div>
    </div>
  );
}
