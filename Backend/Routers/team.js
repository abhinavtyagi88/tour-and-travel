const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel'); // Import the Team model

// Function to generate a unique 8-digit code
const generateUniqueCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase(); // Generate an 8-digit code
};

// Create Team Endpoint
router.post('/team', async (req, res) => {
  const { teamName, description, createdBy, privacy } = req.body;

  try {
    let joinCode = generateUniqueCode();

    // Ensure the join code is unique
    let codeExists = await Team.findOne({ joinCode });
    while (codeExists) {
      joinCode = generateUniqueCode();
      codeExists = await Team.findOne({ joinCode });
    }

    const newTeam = new Team({
      teamName,
      description,
      createdBy,
      privacy,
      joinCode // Store the unique join code
    });

    await newTeam.save();
    
    // Return the created team with the join code
    res.status(201).json({
      team: newTeam,
      joinCode: newTeam.joinCode // Include the join code in the response
    });
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
});

// Join Team Endpoint
router.post('/teams/join', async (req, res) => {
  const { userId, joinCode } = req.body; // Get the user ID and join code from the request body

  try {
    const team = await Team.findOne({ joinCode }); // Find the team by join code

    if (!team) {
      return res.status(404).json({ message: 'Team not found with the provided join code' });
    }

    // Check if the user is already a member
    const memberExists = team.members.some(member => member.userId.toString() === userId);
    if (memberExists) {
      return res.status(400).json({ message: 'User already a member of this team' });
    }

    // Add user to team members
    team.members.push({ userId });
    await team.save();

    res.status(200).json(team); // Return the updated team
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
});

module.exports = router;
