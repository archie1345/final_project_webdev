import React from "react";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

const Dashboard = ({ isOpen }) => {
  return (
    <div className={`dashboard ${isOpen ? "open" : ""}`}>
      <h2>Dashboard</h2>
      <div className="dashboard-item">
        <NavLink
          to="/homepage"
          style={({ isActive }) => ({
            textDecoration: isActive ? "none" : "none",
          })}
          className="nav-link"
        >
          <span className="icon">📝</span> Posts
        </NavLink>
      </div>
      <div className="dashboard-item">
        <span className="icon">📊</span>Analytics
      </div>   
      {/* Add more items as needed */}
    </div>
  );
};

export default Dashboard;
