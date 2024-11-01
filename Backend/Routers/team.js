const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel'); // Import the Team model
const authMiddleware = require('../middleware/authMiddleware');


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
      joinCode: newTeam.joinCode, // Include the join code in the response
      user: req.user 
    });
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
});


// Join Team Endpoint
router.post('/teams/join', async (req, res) => {
  const { userId, joinCode, teamId } = req.body; // Accept teamId for joining public teams

  try {
    let team;

    if (joinCode) {
      // Find the team by join code if provided
      team = await Team.findOne({ joinCode });
      if (!team) {
        return res.status(404).json({ message: 'Team not found with the provided join code' });
      }
    } else if (teamId) {
      // Find the team by ID if no join code is provided
      team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found with the provided team ID' });
      }
      // Ensure the team is public if joining without a join code
      if (team.privacy !== 'public') {
        return res.status(403).json({ message: 'Cannot join private team without a join code' });
      }
    } else {
      return res.status(400).json({ message: 'Join code or team ID is required' });
    }

    // Check if the user is already a member
    const memberExists = team.members.some(member => member.userId.toString() === userId);
    if (memberExists) {
      return res.status(400).json({ message: 'You have already joined this team' });
    }

    // Add user to team members
    team.members.push({ userId });
    await team.save();

    res.status(200).json(team); // Return the updated team
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
});


// Get All Public Teams Endpoint
router.get('/teams', async (req, res) => {
  try {
    const publicTeams = await Team.find({ privacy: 'public' }); // Retrieve only public teams
    res.status(200).json(publicTeams); // Send the public teams as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});


module.exports = router;
