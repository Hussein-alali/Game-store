const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  platform: { type: String, enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo'] },
  coverImage: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);