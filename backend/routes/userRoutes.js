const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require('mongoose');

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // User ID from the URL
    const updateData = req.body;

    // Validate the provided ID
    if (!id) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { userId: id }, // Use `userId` for matching
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Apply schema validation
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser); // Send the updated user data
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "An error occurred while updating the user" });
  }
});


module.exports = router;


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
