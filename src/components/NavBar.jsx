import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { Plus, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <span className="logo">My App</span>
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
        <NavLink to="/profile" className="nav-link">
          <User size={24} className="icon" />
        </NavLink>
      </div>

     
    </nav>
  );
}

export default NavBar;
