// routes/shop.js
const express = require('express');
const router = express.Router();

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(`Shop Route: ${req.method} ${req.url}`);
  next();
});

// Example route for shop
router.get('/', (req, res) => {
  res.send('Welcome to the Shop!');
});

module.exports = router;
