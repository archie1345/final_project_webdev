// Homepage.js
import React from "react";
import "./HomePage.css";
import BlogSnippet from "./BlogSnippet";

function HomePage() {
  return (
    <div className="HomePage">
      
      <main className="content">
        <BlogSnippet/>
      </main>
    </div>
  );
}

export default HomePage;
