import React from "react";
import { Link } from "react-router-dom";  // Import Link to navigate to the detailed post page
import "./HomePage.css";

function BlogSnippet({ title, header, image, postId }) {
    return (
        <div className="blog-container">
            <div className="blog-card">
                <div className="blog-image">
                    <img
                        src={image} // Use the dynamic image passed as a prop
                        alt="Blog Thumbnail"
                    />
                </div>
                <div className="blog-details">
                    <h3 className="blog-title">{title}</h3>
                    <p className="blog-header">{header}</p>
                    {/* Link to the full blog post using the dynamic postId */}
                    <Link to={`/blog/${postId}`} className="read-more">Read More</Link> 
                </div>
            </div>
        </div>
    );
}

export default BlogSnippet;
