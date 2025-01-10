import React from 'react';
import './Dashboard.css';

const Dashboard = ({ isOpen }) => {
  return (
    <div className={`dashboard ${isOpen ? 'open' : ''}`}>
      <h2>Dashboard</h2>
      <div className="dashboard-item">
        <span className="icon">📝</span> Posts
      </div>
      <div className="dashboard-item">
        <span className="icon">📊</span> Analytics
      </div>
      {/* Add more items as needed */}
    </div>
  );
};

export default Dashboard;
