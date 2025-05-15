// server/routes/orders.js
const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();

// Create order from cart (protected)
router.post('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate('items.gameId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      gameId: item.gameId._id,
      quantity: item.quantity,
      price: item.gameId.price
    }));

    const order = new Order({
      userId: req.userId,
      items: orderItems,
      total: cart.total
    });

    await order.save();
    await Cart.deleteOne({ _id: cart._id }); // Clear cart
    
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders (protected)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).populate('items.gameId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;