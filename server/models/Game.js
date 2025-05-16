const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  platform: { type: String, enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo'] },
  coverImage: {
    url: { type: String, required: true },
    publicId: { type: String }, // For cloud storage reference
    alt: { type: String }
  },
  description: { type: String },
  releaseDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);