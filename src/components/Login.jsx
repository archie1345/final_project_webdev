import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [values, setValues] = useState({ showPassword: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
      const { token, user } = res.data;

      // Store the token and navigate with the user ID
      localStorage.setItem("token", token);
      setSuccess("Logged in successfully!");
      setError("");
      navigate(`/homepage/${user.id}`); // Use the actual user ID from the response
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="container">
      <div className="sec-container">
        <h1>Log in</h1>
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
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="input-container">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                placeholder="Password"
                type={values.showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange("password")}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
        <p>
          Don't have an account? <a href="/register">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
