// server/models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [{
    gameId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Game', 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true,
      min: 1,
      default: 1 
    }
  }],
  total: { 
    type: Number, 
    required: true,
    default: 0 
  }
}, {
  timestamps: true
});

// Method to calculate total
CartSchema.methods.calculateTotal = async function() {
  await this.populate('items.gameId');
  this.total = this.items.reduce((sum, item) => {
    return sum + (item.gameId.price * item.quantity);
  }, 0);
  return this.total;
};

// Pre-save middleware to calculate total
CartSchema.pre('save', async function(next) {
  if (this.isModified('items')) {
    await this.calculateTotal();
  }
  next();
});

module.exports = mongoose.model('Cart', CartSchema);