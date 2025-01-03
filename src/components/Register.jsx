import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="container">
      <div className="register-card">
        <h1>Register</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
};

export default Register;