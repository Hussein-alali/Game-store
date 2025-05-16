const express = require('express');
const { body, validationResult } = require('express-validator');
const Game = require('../models/Game');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Get trending games - Must be before parameterized routes
router.get('/trending', async (req, res) => {
  try {
    // Get random games that are in stock
    const trendingGames = await Game.aggregate([
      // Match games that are in stock
      { $match: { stock: { $gt: 0 } } },
      // Get random games
      { $sample: { size: 4 } },
      // Project only the needed fields
      {
        $project: {
          _id: 1,
          title: 1,
          platform: 1,
          category: 1,
          price: 1,
          stock: 1,
          coverImage: 1,
          isNew: 1
        }
      }
    ]);

    res.json({
      games: trendingGames
    });
  } catch (error) {
    console.error('Error fetching trending games:', error);
    res.status(500).json({ message: 'Failed to fetch trending games' });
  }
});

// GET /games - Get paginated list of games
router.get('/', async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting (optional)
    const sortBy = req.query.sortBy || 'title';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    const [games, total] = await Promise.all([
      Game.find()
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),
      Game.countDocuments()
    ]);

    res.json({
      games,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Validation rules for game creation/update
const gameValidationRules = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .trim()
    .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('platform')
    .isIn(['PC', 'PlayStation', 'Xbox', 'Nintendo']).withMessage('Invalid platform'),
  body('coverImage')
    .isURL().withMessage('Cover image must be a valid URL'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description too long')
];

// Validate middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// POST /games - Create new game (Admin only)
router.post('/', auth, admin, gameValidationRules, validate, async (req, res) => {
  try {
    const game = new Game({
      ...req.body,
      addedBy: req.userId // Track which admin added the game
    });
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /games/:id - Update game (Admin only)
router.put('/:id', auth, admin, gameValidationRules, validate, async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /games/:id - Delete game (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;