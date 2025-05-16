// server/routes/cart.js
const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Game = require('../models/Game');
const router = express.Router();

// Get user's cart (protected)
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [], total: 0 });
      await cart.save();
    }

    // Populate game details
    await cart.populate({
      path: 'items.gameId',
      select: 'title price platform coverImage'
    });

    // Transform the data to match frontend expectations
    const transformedCart = {
      items: cart.items.map(item => ({
        quantity: item.quantity,
        game: {
          _id: item.gameId._id,
          title: item.gameId.title,
          price: item.gameId.price,
          platform: item.gameId.platform,
          coverImage: item.gameId.coverImage
        }
      })),
      total: cart.total
    };

    res.json(transformedCart);
  } catch (err) {
    console.error('Cart fetch error:', err);
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Add to cart (protected)
router.post('/add', auth, async (req, res) => {
  const { gameId, quantity = 1 } = req.body;
  
  try {
    // Validate gameId
    if (!gameId) {
      return res.status(400).json({ message: 'Game ID is required' });
    }

    // Find the game
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if game is in stock
    if (game.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [], total: 0 });
    }

    // Check if game already in cart
    const existingItem = cart.items.find(item => item.gameId.equals(gameId));
    if (existingItem) {
      // Check if new total quantity exceeds stock
      if (existingItem.quantity + quantity > game.stock) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ gameId, quantity });
    }

    // Save cart and calculate total
    await cart.calculateTotal();
    await cart.save();

    // Return updated cart
    await cart.populate({
      path: 'items.gameId',
      select: 'title price platform coverImage'
    });

    const transformedCart = {
      items: cart.items.map(item => ({
        quantity: item.quantity,
        game: {
          _id: item.gameId._id,
          title: item.gameId.title,
          price: item.gameId.price,
          platform: item.gameId.platform,
          coverImage: item.gameId.coverImage
        }
      })),
      total: cart.total
    };

    res.json(transformedCart);
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

// Update cart item quantity (protected)
router.put('/item/:gameId', auth, async (req, res) => {
  const { gameId } = req.params;
  const { quantity } = req.body;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (quantity > game.stock) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.gameId.equals(gameId));
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.calculateTotal();
    await cart.save();

    await cart.populate({
      path: 'items.gameId',
      select: 'title price platform coverImage'
    });

    const transformedCart = {
      items: cart.items.map(item => ({
        quantity: item.quantity,
        game: {
          _id: item.gameId._id,
          title: item.gameId.title,
          price: item.gameId.price,
          platform: item.gameId.platform,
          coverImage: item.gameId.coverImage
        }
      })),
      total: cart.total
    };

    res.json(transformedCart);
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Remove item from cart (protected)
router.delete('/item/:gameId', auth, async (req, res) => {
  const { gameId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => !item.gameId.equals(gameId));
    await cart.calculateTotal();
    await cart.save();

    await cart.populate({
      path: 'items.gameId',
      select: 'title price platform coverImage'
    });

    const transformedCart = {
      items: cart.items.map(item => ({
        quantity: item.quantity,
        game: {
          _id: item.gameId._id,
          title: item.gameId.title,
          price: item.gameId.price,
          platform: item.gameId.platform,
          coverImage: item.gameId.coverImage
        }
      })),
      total: cart.total
    };

    res.json(transformedCart);
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

module.exports = router;