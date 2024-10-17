const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// /add-product route to show the form
app.get('/add-product', (req, res) => {
  res.send(`
    <form action="/add-product" method="POST">
      <input type="text" name="productName" placeholder="Product Name" required />
      <input type="text" name="productSize" placeholder="Product Size" required />
      <button type="submit">Add Product</button>
    </form>
  `);
});

app.post('/add-product', (req, res) => {
  console.log('Product Name:', req.body.productName);
  console.log('Product Size:', req.body.productSize);
  res.send('Product details logged to console.');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
