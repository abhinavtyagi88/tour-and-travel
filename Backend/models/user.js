const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  preferredDestinations: { type: String },  // optional field
  travelFrequency: { type: String, enum: ['Weekly', 'Monthly', 'Occasionally'], required: true },
  budget: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);


