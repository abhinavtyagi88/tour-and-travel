const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  place: {
    country: { type: String, required: true },
    placeName: { type: String, required: true }
  },
  caption: { type: String, maxlength: 500 },
  images: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User
}, { timestamps: true }); // Enable timestamps

function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model('Post', postSchema);
