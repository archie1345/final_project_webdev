import React from 'react';
import './BlogPage.css'; // Import the CSS file
import { Plus, User } from 'lucide-react';

function BlogPage() {
  return (
    <div className="blog-container">
      <div className="header">
        <div className="menu-icon">{/* Add your menu icon implementation here */}</div>
        <div className="nav-buttons">
          <Plus size={24} className="icon" />
          <User size={24} className="icon" />
        </div>
      </div>

      <div className="blog-content">
        <img src="/path/to/blog-image.jpg" alt="Blog Image" />
        <h2>Blog Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}

export default BlogPage;