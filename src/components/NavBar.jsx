import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { Plus, User, LogOut, Settings } from "lucide-react"; // Add any other icons you need
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { jwtDecode } from "jwt-decode";

function NavBar({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    // Clear the token from localStorage (or sessionStorage)
    localStorage.removeItem("token");
    // Redirect to login page
    window.location.href = "/login";
  };
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.id; // Extract the user ID from the token
  }

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
        <NavLink to="/write" className="nav-link">
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
                <h3>Username</h3>
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
              <NavLink to="/logout" className="menu-item" onClick={handleLogout}>
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
