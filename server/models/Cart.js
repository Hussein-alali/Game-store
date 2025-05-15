// server/models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    quantity: { type: Number, default: 1 }
  }],
  total: { type: Number, default: 0 }
});

module.exports = mongoose.model('Cart', CartSchema);