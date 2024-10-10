const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false // Description is optional
  },
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now // Timestamp of when the team was created
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema for the team creator
    required: true
  },
  privacy: {
    type: String,
    enum: ['public', 'private'], // Privacy settings for the team
    default: 'public'
  },
  joinCode: {
    type: String,
    required: true,
    unique: true // Ensure the join code is unique
  }
});

// Create a Team model
const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
