// routes/admin.js
const express = require('express');
const router = express.Router();

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(`Admin Route: ${req.method} ${req.url}`);
  next();
});

// /admin/add-product route
router.get('/add-product', (req, res) => {
  res.send(`
    <form action="/admin/add-product" method="POST">
      <input type="text" name="productName" placeholder="Product Name" required />
      <input type="text" name="productSize" placeholder="Product Size" required />
      <button type="submit">Add Product</button>
    </form>
  `);
});

// Handling form submission for /admin/add-product
router.post('/add-product', (req, res) => {
  console.log('Product Name:', req.body.productName);
  console.log('Product Size:', req.body.productSize);
  res.send('Product details logged to console.');
});

module.exports = router;
