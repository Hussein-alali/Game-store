const User = require('../models/User');

async function adminMiddleware(req, res, next) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Admin privileges required' });
    }

    req.adminUser = user; // Attach admin user object for potential future use
    next();
  } catch (err) {
    console.error('Admin Middleware Error:', err);
    res.status(500).json({ message: 'Internal server error checking admin status' });
  }
}

module.exports = adminMiddleware;