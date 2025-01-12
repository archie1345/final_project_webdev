import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BlogPage.css";

function BlogPage() {
  const { postId } = useParams(); // Get the postId from the URL parameter
  const [post, setPost] = useState(null); // State to store the single post data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Ensure that postId is available before making the request
    if (!postId) {
      setError("Post ID is missing");
      setLoading(false);
      return;
    }
    console.log(postId);
    axios
      .get(`http://localhost:5000/api/posts/${postId}`) // Fetch post data from backend
      .then((response) => {
        setPost(response.data); // Store the post data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Failed to load the post"); // Generic error message
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>{error}</p>; // Display error message if any

  return (
    <div className="blog-page">
      <main className="content">
        {post ? (
          <div className="blog-content">
            <img
              src={post.imageUrl || "https://picsum.photos/600/300"} // Use default image if none exists
              alt="Blog Thumbnail"
              className="blog-image"
            />
            <h2>{post.title}</h2>
            <p>By {post.author?.username || "Unknown Author"}</p> {/* Display username */}
            <div>{post.content}</div>
            <p>
              <small>
                Created at: {new Date(post.createdAt).toLocaleString()}
              </small>
            </p>
          </div>
        ) : (
          <p>No post data available.</p> // Fallback if post data is missing
        )}
      </main>
    </div>
  );
}

export default BlogPage;
