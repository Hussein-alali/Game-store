// server/routes/cart.js
const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Game = require('../models/Game');
const router = express.Router();

// Get user's cart (protected)
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate('items.gameId');
    res.json(cart || { items: [], total: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to cart (protected)
router.post('/add', auth, async (req, res) => {
  const { gameId, quantity } = req.body;
  
  try {
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find(item => item.gameId.equals(gameId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ gameId, quantity });
    }

    cart.total = cart.items.reduce((sum, item) => sum + (game.price * item.quantity), 0);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;