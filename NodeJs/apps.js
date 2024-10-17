const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use admin routes
app.use('/admin', adminRoutes);

// Use shop routes
app.use('/shop', shopRoutes);

// 404 Page Not Found Middleware
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
