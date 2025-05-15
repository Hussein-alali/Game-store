// server/routes/admin.js
const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const Game = require('../models/Game');

// Delete game (Admin only)
router.delete('/games/:id', admin, async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update game (Admin only)
router.put('/games/:id', admin, async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;