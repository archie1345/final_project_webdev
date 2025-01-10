// BlogPage.js
import React from 'react';
import './BlogPage.css'; // Import the CSS file

function BlogPage() {
  return (
    <div className="blog-page">
      {/* Konten Halaman Blog */}
      <div className="blog-content">
        <img 
          src="https://picsum.photos/300/200" // Ganti URL ini dengan link gambar nyata
          alt="Blog Thumbnail" 
          className="blog-image" 
        />
        <h2>Blog Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="pagination">
          <button>← Previous</button>
          <span className="page-number active-page">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <span>...</span>
          <span className="page-number">67</span>
          <span className="page-number">68</span>
          <button>Next →</button>
        </div>
    </div>
  );
}

export default BlogPage;
