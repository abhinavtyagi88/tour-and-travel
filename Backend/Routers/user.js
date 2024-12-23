const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Update with the correct path to your user model
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary.js')
const mongoose = require('mongoose');

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 


// Signup route
router.post('/signup', [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Email is not valid').normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('gender').isIn(['male', 'female', 'other']).withMessage('Gender is required'),
    check('dob').isDate().withMessage('Date of birth is required'),
    check('address').notEmpty().withMessage('Address is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('pincode').notEmpty().withMessage('Pincode is required'),
    check('preferredDestinations').notEmpty().withMessage('Preferred destinations are required'),
    check('travelFrequency').isIn(['Weekly', 'Monthly', 'Occasionally']).withMessage('Travel frequency is required'),
    check('budget').isNumeric().withMessage('Budget must be a number')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, gender, dob, address, state, city, pincode, preferredDestinations, travelFrequency, budget } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender,
            dob,
            address,
            state,
            city,
            pincode,
            preferredDestinations,
            travelFrequency,
            budget
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(400).json({ error: 'Error creating user', details: error.message });
    }
});

// //upload profile image
//middleware


router.put('/profileImg', async (req, res, next) => {
    try {
        const {  userId,image_url } = req.body;
        console.log(image_url);
        
        // Upload image to Cloudinary
        const cloudinary_res = await cloudinary.v2.uploader.upload(image_url, {
            folder: 'Wandermates_profile_pics',
            allowed_formats: ['jpg', 'jpeg', 'png']
        });

        // Update user with new image URL
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { img: cloudinary_res.secure_url },
            { new: true } // Return the updated document
        );
        console.log(userId);
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send response with the new image URL and user ID
        res.status(200).json({
            message: 'Profile image updated successfully',
            userId: userId,
            imageUrl: updatedUser.img
        });

    } catch (error) {
        console.error("Error in Cloudinary upload:", error);
        res.status(500).json({ message: "Error uploading image to Cloudinary" });
    }
});

// Get user profile details (name, image, age, gender)

router.get('/profile/:userId',  async (req, res) => {
    let { userId } = req.params; // Get userId from request parameters

    // Remove any leading or trailing spaces and unwanted characters (like ":")
    userId = userId.replace(/^[:]/, '');  // This removes the leading colon if present

    // Ensure userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate age
        const dob = new Date(user.dob);
        const age = new Date().getFullYear() - dob.getFullYear();
        const is18Plus = age >= 18 ? '18+' : 'Under 18';

        // Prepare the response data
        const userData = {
            name: `${user.firstName} ${user.lastName}`,
            image: user.img,
            age: is18Plus,
            gender: user.gender
        };

        res.status(200).json({ user: userData });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching user profile");
    }
});


// Login route

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userInstance = await User.findOne({ email });
        if (!userInstance) return res.status(404).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, userInstance.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: userInstance._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            token,
            user: {
                id: userInstance._id,
                firstName: userInstance.firstName,
                lastName: userInstance.lastName,
                email: userInstance.email,
                img: userInstance.img,
                // include other fields as needed
            } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});







// Export the router
module.exports = router;
