const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Database connection
connectDB();

app.get('/api/dbstatus', (req, res) => {
    res.json({
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      dbName: mongoose.connection.name,
      host: mongoose.connection.host
    });
  });
// Add error handling middleware (last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
 });



// Routes
app.use('/api/games', require('./routes/games'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









db/connect