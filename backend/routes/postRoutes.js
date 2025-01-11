const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single post
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post('/api/posts', async (req, res) => {
  try {
    const { title, content, author, imageUrl, isDraft } = req.body;

    // Validation to ensure title, content, and author are provided
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Title, content, and author are required" });
    }

    const newPost = new Post({
      title,
      content,
      author,
      imageUrl,
      isDraft,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Respond with the saved post data
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error. Could not create post.' });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
