import React from "react";
import "./HomePage.css";

function BlogSnippet() {
    return (
        <div className="blog-container">
          <div className="blog-card">
            <div className="blog-image">
              <img
                src="https://via.placeholder.com/300x150.png?text=Chart"
                alt="Chart"
              />
            </div>
            <div className="blog-details">
              <h3 className="blog-title">Blog Title</h3>
              <p className="blog-header">Blog Header</p>
            </div>
          </div>
        </div>
    );
}

export default BlogSnippet;