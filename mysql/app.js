const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const db = require('./db'); // MySQL connection

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Routes
app.use('/api', productRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
