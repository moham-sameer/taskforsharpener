const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the MySQL connection

// DELETE route to delete a product by ID
router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // MySQL query to delete the product by ID
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [productId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
