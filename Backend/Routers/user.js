const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Update with the correct path to your user model
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary.js')

// const { cloudinary_upload } = require('../config/cloudinary.js');

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
router.post('/profileImg', async (req, res, next) => {
    try {
        const { image_url } = req.body;
        const cloudinary_res = await cloudinary.v2.uploader.upload(image_url, {
            folder: 'Wandermates_profile_pics',
            allowed_formats: ['jpg', 'jpeg', 'png']
        });

        console.log(cloudinary_res);
      

    } catch (error) {
        console.error("Error in Cloudinary upload:", error);
        res.status(500).json({ message: "Error uploading image to Cloudinary" });
    }
});

router.put('/profileImg1', async (req, res, next) => {
    try {
        const {  userId,image_url } = req.body;

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



// router.put('/profile-image',  async (req, res) => {
//     try {
//         // Check if an image file is uploaded
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const userId = req.user.userId;  // Assuming the auth middleware attaches the user's ID to the request
        // const imgUrl = cloudinary_res.secure_url    // Cloudinary URL of the uploaded image

//         // Update user's profile image in the database
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { img: imgUrl },
//             { new: true }  // Returns the updated document
//         );

//         Send response with the new image URL
//         res.status(200).json({ message: 'Profile image updated successfully', imgUrl: updatedUser.img });
//     } catch (error) {
//         console.error("Error uploading profile image:", error);
//         res.status(500).json({ error: 'Error updating profile image', details: error.message });
//     }
// });


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




// Update user details route (Protected)
router.put('/me', authMiddleware, (req, res) => {
    res.status(200).json({ message: "Middleware is working!", user: req.user });
});


// Export the router
module.exports = router;
