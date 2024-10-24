const mongoose = require('mongoose');
// const { required } = require('nodemon/lib/config');


const guideSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  GuideImg:{type:String  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  aadhar :{ type: String , required:true},
  TouristPlaces: { type: String },  // optional field
  ChargesperDay: { type: Number, required: true },
  ChargesperHour: { type: Number, required: true },
  
  Services:{type:String , required: true}
});

module.exports = mongoose.model('guide', guideSchema);


