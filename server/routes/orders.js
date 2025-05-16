// server/routes/orders.js
const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Game = require('../models/Game');
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
      price: item.gameId.price,
      title: item.gameId.title,
      platform: item.gameId.platform,
      coverImage: item.gameId.coverImage
    }));

    const order = new Order({
      userId: req.userId,
      items: orderItems,
      total: cart.total,
      status: 'pending',
      paymentDetails: {
        method: req.body.paymentMethod || 'credit_card',
        status: 'pending'
      },
      shippingAddress: req.body.shippingAddress
    });

    await order.save();
    await Cart.deleteOne({ _id: cart._id }); // Clear cart
    
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders (protected)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ orderDate: -1 }) // Sort by most recent first
      .populate({
        path: 'items.gameId',
        select: 'title platform coverImage'
      });

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get order details (protected)
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.userId
    }).populate({
      path: 'items.gameId',
      select: 'title platform coverImage'
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('Error fetching order details:', err);
    res.status(500).json({ message: err.message });
  }
});

// Cancel order (protected)
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.userId,
      status: 'pending'
    });

    if (!order) {
      return res.status(404).json({ 
        message: 'Order not found or cannot be cancelled' 
      });
    }

    order.status = 'cancelled';
    order.statusHistory.push({
      status: 'cancelled',
      date: new Date(),
      note: req.body.reason || 'Cancelled by user'
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error('Error cancelling order:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;