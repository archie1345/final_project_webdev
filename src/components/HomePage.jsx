// Homepage.js
import React from "react";
import NavBar from "./NavBar";
import "./HomePage.css";
import BlogSnippet from "./BlogSnippet";

function HomePage() {
  return (
    <div className="HomePage">
      <NavBar /> {/* Render NavBar at the top */}
      <main className="content">
        <BlogSnippet/>
      </main>
    </div>
  );
}

export default HomePage;
