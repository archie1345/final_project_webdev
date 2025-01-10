import React from "react";
import "./HomePage.css";
import BlogSnippet from "./BlogSnippet";

function HomePage() {
  return (
    <div className="HomePage">
      <main className="content">
        <div className="blog-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogSnippet key={index} />
          ))}
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
      </main>
    </div>
  );
}

export default HomePage;
