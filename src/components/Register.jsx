import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        { email: formData.email, password: formData.password }
      );
      setSuccess("Registered successfully!");
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="container">
      <div className="sec-container">
        <h1>Register</h1>
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                name="email"
                placeholder="Email"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <div className="input-container">
              <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
              <Input
                name="confirm_password"
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <button type="submit">Register</button>
          </form>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
        <p>
          Already have an account? <a href="/login">Log in now</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
