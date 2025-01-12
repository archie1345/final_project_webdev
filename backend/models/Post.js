const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String },
    isDraft: { type: Boolean, default: false },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;