const express = require('express');
const { getAllProducts,deleteProduct } = require('../controller/productController');
const router = express.Router();

router.get('/',getAllProducts)
router.delete('/:id',deleteProduct)

module.exports = router;