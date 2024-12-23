const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel'); // Import the Team model
const authMiddleware = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary.js'); // Remove this if you're not handling image uploads
const generateUniqueCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();
const mongoose = require('mongoose');

// Create Team Endpoint
router.post('/team',  async (req, res) => {
  const { teamName, description,createdBy, Image_url, privacy } = req.body;
  
  // Ensure the user is authenticated and retrieve their userId

  try {
    // Generate a unique join code
    let joinCode = generateUniqueCode();
    while (await Team.findOne({ joinCode })) {
      joinCode = generateUniqueCode();
    }

    // Optionally, skip image upload if you're not using it
    let cloudinary_res;
    if (Image_url) {
      try {
        cloudinary_res = await cloudinary.v2.uploader.upload(Image_url, {
          folder: 'Wandermates_profile_pics',
          allowed_formats: ['jpg', 'jpeg', 'png']
        });
      } catch (uploadError) {
        return res.status(500).json({ message: "Image upload failed", error: uploadError });
      }
    }
   console.log(cloudinary_res);
   
    const newTeam = new Team({
      teamName,
      description,
      Image: cloudinary_res ? cloudinary_res.secure_url : null, // If image is uploaded, use the secure URL
      createdBy, // Use the authenticated user's ID
      privacy,
      joinCode,
    });

    await newTeam.save();

    res.status(201).json({
      team: newTeam,
      joinCode: newTeam.joinCode,
      user: req.user // Send user information in the response
    });
  } catch (error) {
    res.status(400).json({ message: `Team creation failed: ${error.message}` });
  }
});

router.get('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id); // Get team by ID
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team); // Send the team data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Join Team Endpoint
router.post('/teams/join', authMiddleware, async (req, res) => {
  const { userId, joinCode, teamId } = req.body;

  try {
    let team;

    // Find the team based on the join code or team ID
    if (joinCode) {
      team = await Team.findOne({ joinCode });
      if (!team) {
        return res.status(404).json({ message: 'Team not found with the provided join code' });
      }
    } else if (teamId) {
      team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found with the provided team ID' });
      }
      if (team.privacy !== 'public') {
        return res.status(403).json({ message: 'Cannot join private team without a join code' });
      }
    } else {
      return res.status(400).json({ message: 'Join code or team ID is required' });
    }

    // Ensure the user is not the team creator
    if (team.createdBy.toString() === userId) {
      return res.status(400).json({ message: 'You cannot join your own team' });
    }

    // Check if the user is already a member of the team
    const isAlreadyMember = team.members.some(member => member.userId.toString() === userId);
    if (isAlreadyMember) {
      return res.status(400).json({ message: 'You have already joined this team' });
    }

    // Add the user to the team
    team.members.push({ userId });
    await team.save();

    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Public Teams Endpoint
router.get('/teams', async (req, res) => {
  try {
    const publicTeams = await Team.find({ privacy: 'public' });
    res.status(200).json(publicTeams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete Team Endpoint
router.delete('/team/:id', async (req, res) => {
  const teamId = req.params.id; // This may have a "team:" prefix causing the issue
  const userId = req.body.id;
 console.log(userId,teamId);
 
  try {
    // Fix by removing "team:" if it's present
    const actualTeamId = teamId.replace('team:', ''); // Make sure it's just the ObjectId
    
    if (!mongoose.Types.ObjectId.isValid(actualTeamId)) {
      return res.status(400).json({ message: 'Invalid team ID format' });
    }

    const team = await Team.findById(actualTeamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // if (team.createdBy.toString() !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to delete this team' });
    // }

    await team.deleteOne();
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: `Failed to delete team: ${error.message}` });
  }
});




module.exports = router;
