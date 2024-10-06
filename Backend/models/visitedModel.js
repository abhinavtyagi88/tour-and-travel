const mongoose = require('mongoose');

const visitedPlaceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  place: {
    country: { type: String, required: true },
    placeName: { type: String, required: true }
  },
  visitDate: { type: Date, default: Date.now },
  comments: { type: String } // Optional comments about the visit
});

// Ensure the place is unique for a user
visitedPlaceSchema.index({ user: 1, 'place.country': 1, 'place.placeName': 1 }, { unique: true });

module.exports = mongoose.model('VisitedPlace', visitedPlaceSchema);
