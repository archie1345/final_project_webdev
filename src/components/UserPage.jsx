// pages/UserPage.js
import React from "react";
import NavBar from "../components/NavBar";
import UserProfile from "../components/pageBuilder/UserProfile";
import ContentSection from "../components/pageBuilder/ContentSection";
import "./UserPage.css";

export default function UserPage() {
  return (
    <div className="user-page">
      <NavBar />
      <UserProfile />
      <ContentSection />
    </div>
  );
}
