import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import WritePage from "./components/WritePage";
import BlogPage from "./components/BlogPage";
import HomePage from "./components/HomePage";
import BlogSnippet from "./components/BlogSnippet";
import UserPage from "./components/UserPage";
import NavBar from "./components/NavBar";
import UserProfile from "./components/pageBuilder/UserProfile";

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="layout">
        <NavBar />
      <main className="main-content">
        {React.cloneElement(children, { isMenuOpen, setIsMenuOpen })}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/write"
          element={
            <Layout>
              <WritePage />
            </Layout>
          }
        />
        <Route
          path="/blogpage"
          element={
            <Layout>
              <BlogPage />
            </Layout>
          }
        />
        <Route
          path="/homepage"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <Layout>
              <UserPage />
            </Layout>
          }
        />
        <Route path="/blog/:postId" element={<BlogPage />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route>
          <Route path="/blogpage" element={<BlogPage />} />
        </Route>
        <Route>
          <Route path="/blogsnip" element={<BlogSnippet />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
