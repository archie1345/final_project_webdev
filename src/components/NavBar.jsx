import React from 'react';
import './NavBar.css'; 
import { Link, Plus, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="menu-icon">{/* Add your menu icon implementation here */}</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <span className="search-icon">{/* Add your search icon implementation here */}</span> 
      </div>
      <div className="nav-buttons">
        {/* Link for the Plus button */}
        <NavLink to="/write">
          <Plus size={24} className="icon" />
        </NavLink>
        {/* Link for the User button */}
        <NavLink to="/profile">
          <User size={24} className="icon" />
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;