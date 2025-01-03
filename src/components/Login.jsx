import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="container">
      <div className="login-card">
        <h1>Log in</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Sign up now</a></p>
      </div>
    </div>
  );
};

export default Login;