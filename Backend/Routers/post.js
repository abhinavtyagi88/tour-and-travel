const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const User = require('../models/user');

// Create a new post
router.post('/create', async (req, res) => {
  try {
    const { place, caption, images, userId } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new post
    const newPost = new Post({
      place,
      caption,
      images,
      user: userId
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get posts with user details from DATABASE
router.get('/with-user', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'firstName lastName email');
    res.json(posts); // Timestamps will be included automatically
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get posts by a particular user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL parameters
    const posts = await Post.find({ user: userId }).populate('user', 'firstName lastName email');
    
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }

    res.json(posts); // Timestamps will be included automatically
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post (include updatedAt field)
router.put('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
    
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost); // Timestamps will be included automatically
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
