import React from "react";
import "./UserProfile.css";

export default function UserProfile() {
  // Static dummy user data
  const user = {
    name: "Username",
    bannerImage: "https://picsum.photos/1200/200?random=4", // Random banner image
    profileImage: "https://picsum.photos/100/100?random=5"  // Random profile image
  };

  return (
    <div className="user-profile">
      {/* Banner Section */}
      <div className="banner">
        <img src={user.bannerImage} alt="User banner" />
      </div>
      
      {/* Profile Details Section */}
      <div className="profile-details">
        <div className="profile-picture">
          <img src={user.profileImage} alt="User profile" />
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
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
