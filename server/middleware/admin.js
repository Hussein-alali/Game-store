const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Admin privileges required' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};