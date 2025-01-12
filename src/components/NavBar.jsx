import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { Plus, User, LogOut, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import {jwtDecode} from "jwt-decode"; // Correct default import

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(null); // State to store username
  const [userId, setUserId] = useState(null); // State to store user ID

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setUsername(null); // Reset username
    setUserId(null); // Reset user ID
    window.location.href = "/login"; // Redirect to login page
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        console.log("Decoded Token:", decoded); // Debugging: Log decoded token
        setUsername(decoded.username); // Set username from token
        setUserId(decoded.id); // Set user ID from token
      } catch (err) {
        console.error("Failed to decode token:", err);
        setUsername(null); // Reset username on error
        setUserId(null); // Reset user ID on error
      }
    } else {
      console.log("No token found");
    }
  }, []); // Run once on component mount

  return (
    <nav className="navbar">
      {/* Left Section (Menu Button and Logo) */}
      <div className="navbar-left">
        <button
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Dashboard Sidebar */}
      <Dashboard isOpen={isMenuOpen} />

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <span className="search-icon"></span>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <NavLink to={`/write/${userId}`} className="nav-link">
          <Plus size={24} className="icon" />
        </NavLink>

        {/* Profile Dropdown */}
        <div className="profile-dropdown">
          <NavLink to={`/users/${userId}`} className="nav-link">
            <User size={24} className="icon profile-icon" />
          </NavLink>
          <div className="profile-menu">
            <div className="profile-header">
              <User size={40} className="profile" />
              <div>
                <h3>{username || "Guest"}</h3> {/* Display username */}
                <NavLink to={`/users/${userId}`} className="menu-item">
                  <span>Visit Profile</span>
                </NavLink>
              </div>
            </div>
            <hr />
            <div className="menu-options">
              <NavLink to="/settings" className="menu-item">
                <Settings size={20} />
                <span>Settings</span>
              </NavLink>
              <NavLink
                to="/logout"
                className="menu-item"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span>Log out</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
