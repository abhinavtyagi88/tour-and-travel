const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    motherName: { type: String, required: true },
    fatherName: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    dob: { type: Date, required: true },
    pincode: { type: String, required: true },
    course: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Using 'user' as the model name
module.exports = mongoose.model('user', userSchema); // This will reference 'user' collection
