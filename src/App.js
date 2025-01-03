import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import WritePage from './components/WritePage';
import Dashboard from './components/Dashboard';
import BlogPage from './components/BlogPage';
import NavBar from './components/NavBar';

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="layout">
      <header className="header">
        <button 
          className="menu-button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </header>
      <Dashboard isOpen={isMenuOpen} />
      <main className="main-content">
        {React.cloneElement(children, { isMenuOpen, setIsMenuOpen })}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
    <NavBar />
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
        <Route path="/" element={<Navigate to="/write" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;