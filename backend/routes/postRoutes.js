const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User")
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token is missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

router.post("/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  const { title, content, imageUrl, isDraft } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create new post
    const newPost = new Post({
      title,
      content,
      author: user._id, // Use ObjectId
      imageUrl,
      isDraft,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating post:", err); // Log exact error
    res.status(500).json({ error: "Failed to create post." });
  }
});



// Get all posts
router.get("/", async (req, res) => {
  try {
    console.log("Fetching posts...");
    const posts = await Post.find().populate("author", "username");
    console.log("Posts fetched:", posts);
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});



// Get a single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Failed to fetch post." });
  }
});


// Create a new post (requires authentication)
router.post("/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  const { title, content, imageUrl, isDraft } = req.body;

  console.log("Request Body:", req.body); // Log request body
  console.log("User ID:", userId); // Log userId from params

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const newPost = new Post({
      title,
      content,
      author: userId, // Associate post with userId
      imageUrl,
      isDraft,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating post:", err); // Log the exact error
    res.status(500).json({ error: "Failed to create post." });
  }
});


// Update a post (requires authentication)
router.put("/:id", authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author !== req.user.username) {
      return res.status(403).json({ message: "You are not authorized to update this post." });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post." });
  }
});

// Delete a post (requires authentication)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author !== req.user.username) {
      return res.status(403).json({ message: "You are not authorized to delete this post." });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post." });
  }
});

module.exports = router;
