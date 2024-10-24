const express = require('express');
const router = express.Router();
const Guide = require('../models/localGuide'); // Assuming the guide schema is in models folder


// Create a new guide
router.post('/guides', async (req, res) => {
  try {
    const newGuide = new Guide(req.body);
    await newGuide.save();
    res.status(201).json({ message: 'Guide created successfully!', guide: newGuide });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create guide', details: error.message });
  }
});

// Get all guides
router.get('/guides', async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guides', details: error.message });
  }
});

// Get guide by ID
router.get('/guides/:id', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guide', details: error.message });
  }
});

// Update a guide by ID
router.put('/guides/:id', async (req, res) => {
  try {
    const updatedGuide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGuide) return res.status(404).json({ error: 'Guide not found' });
    res.json({ message: 'Guide updated successfully!', guide: updatedGuide });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update guide', details: error.message });
  }
});

// Delete a guide by ID
router.delete('/guides/:id', async (req, res) => {
  try {
    const deletedGuide = await Guide.findByIdAndDelete(req.params.id);
    if (!deletedGuide) return res.status(404).json({ error: 'Guide not found' });
    res.json({ message: 'Guide deleted successfully!', guide: deletedGuide });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete guide', details: error.message });
  }
});

module.exports = router;
