const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  platform: { type: String, enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo'] },
  category: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  coverImage: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    fileName: { type: String, required: true }
  },
  description: { type: String },
  isNew: { type: Boolean, default: false },
  releaseDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Add a virtual property to generate image URL
GameSchema.virtual('imageUrl').get(function() {
  return `/api/games/${this._id}/image`;
});

// Ensure virtuals are included when converting to JSON
GameSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    if (ret.coverImage) {
      ret.coverImage = ret.imageUrl;
      delete ret.coverImage.data;
    }
    return ret;
  }
});

module.exports = mongoose.model('Game', GameSchema);