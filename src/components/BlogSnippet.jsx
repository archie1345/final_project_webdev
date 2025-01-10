import React from "react";
import "./HomePage.css";

function BlogSnippet() {
    return (
        <div className="blog-container">
          <div className="blog-card">
            <div className="blog-image">
              <img
                 src="https://picsum.photos/300/200" // Ganti URL ini dengan link gambar nyata
            alt="Blog Thumbnail"
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