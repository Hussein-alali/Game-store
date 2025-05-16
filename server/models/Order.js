// server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
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
      min: 1 
    },
    price: { 
      type: Number, 
      required: true,
      min: 0 
    }
  }],
  total: { 
    type: Number, 
    required: true,
    min: 0 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending' 
  },
  paymentDetails: {
    method: { 
      type: String, 
      enum: ['credit_card', 'paypal'],
      required: true 
    },
    transactionId: String,
    status: { 
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  }
}, {
  timestamps: true
});

// Method to calculate total
OrderSchema.methods.calculateTotal = function() {
  this.total = this.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  return this.total;
};

// Pre-save middleware to calculate total
OrderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.calculateTotal();
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);