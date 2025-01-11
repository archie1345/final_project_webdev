import React, { useState, useEffect } from "react";
import "./HomePage.css";
import BlogSnippet from "./BlogSnippet";
import axios from "axios";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts") // Fetch all posts from the backend
      .then((response) => {
        setPosts(response.data); // Store posts data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="HomePage">
      <main className="content">
        <div className="blog-grid">
          {posts.map((post) => (
            <BlogSnippet
              key={post._id}
              title={post.title}
              header={post.content ? post.content.substring(0, 100) + "..." : "No content available"}
              image={post.imageUrl || "https://picsum.photos/300/200"}
              postId={post._id}  // Pass the postId here
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
