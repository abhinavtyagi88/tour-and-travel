const express = require('express');
const router = express.Router();
const VisitedPlace = require('../models/VisitedModel');



// Add a visited place
router.post('/add', async (req, res) => {
  try {
    const { userId, place, comments } = req.body;

    const newVisitedPlace = new VisitedPlace({
      user: userId,
      place,
      comments
    });

    const savedPlace = await newVisitedPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all visited places by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const visitedPlaces = await VisitedPlace.find({ user: userId });
    
    if (visitedPlaces.length === 0) {
      return res.status(404).json({ message: 'No visited places found for this user' });
    }

    res.json(visitedPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a visited place
router.delete('/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const deletedPlace = await VisitedPlace.findByIdAndDelete(placeId);
    
    if (!deletedPlace) {
      return res.status(404).json({ message: 'Visited place not found' });
    }

    res.json({ message: 'Visited place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
