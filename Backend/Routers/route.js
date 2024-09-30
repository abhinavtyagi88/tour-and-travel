const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Update with the correct path to your user model
const { check, validationResult } = require('express-validator');

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

// Middleware to validate token
const authMiddleware = require('../middleware/authMiddleware');

// Signup route
router.post('/signup', [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('motherName').notEmpty().withMessage('Mother name is required'),
    check('fatherName').notEmpty().withMessage('Father name is required'),
    check('address').notEmpty().withMessage('Address is required'),
    check('gender').isIn(['male', 'female', 'other']).withMessage('Gender is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('dob').isDate().withMessage('Date of birth is required'),
    check('pincode').notEmpty().withMessage('Pincode is required'),
    check('course').notEmpty().withMessage('Course is required'),
    check('email').isEmail().withMessage('Email is not valid').normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, motherName, fatherName, address, gender, state, city, dob, pincode, course, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            motherName,
            fatherName,
            address,
            gender,
            state,
            city,
            dob,
            pincode,
            course,
            email,
            password: hashedPassword
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
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

// Get user details route (Protected)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from response
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user details', details: error.message });
    }
});

// Update user details route (Protected)
router.put('/me', authMiddleware, async (req, res) => {
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select('-password'); // Exclude password from response
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user details', details: error.message });
    }
});



// Export the router
module.exports = router;
