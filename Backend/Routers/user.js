const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Update with the correct path to your user model
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

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

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userInstance = await User.findOne({ email });
        if (!userInstance) return res.status(404).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, userInstance.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: userInstance._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});


// Get user details route (Protected)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const userInstance = await User.findById(req.user.userId).select('-password'); // Exclude password from response
        if (!userInstance) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(userInstance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user details', details: error.message });
    }
});

// Update user details route (Protected)
router.put('/me', authMiddleware, async (req, res) => {
    const updates = req.body;

    try {
        const userInstance = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select('-password'); // Exclude password from response
        if (!userInstance) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(userInstance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user details', details: error.message });
    }
});

// Export the router
module.exports = router;
