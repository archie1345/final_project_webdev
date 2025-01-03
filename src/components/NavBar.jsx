import React from 'react';
import './NavBar.css'; 
import { Plus, User } from 'lucide-react';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="menu-icon">{/* Add your menu icon implementation here */}</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <span className="search-icon">{/* Add your search icon implementation here */}</span> 
      </div>
      <div className="nav-buttons">
        <Plus size={24} className="icon" />
        <User size={24} className="icon" />
      </div>
    </nav>
  );
}

export default NavBar;