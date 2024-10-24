const express = require('express');
const router = express.Router();
const Guide = require('../models/localGuide'); // Assuming the schema file is saved as guide.js

// Create a new guide
router.post('/', async (req, res) => {
  try {
    const newGuide = new Guide(req.body);
    await newGuide.save();
    res.status(201).json(newGuide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all guides
router.get('/', async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a guide by ID
router.get('/:id', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a guide by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedGuide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGuide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.json(updatedGuide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a guide by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedGuide = await Guide.findByIdAndDelete(req.params.id);
    if (!deletedGuide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.json({ message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
