const express = require('express');
const {
  fetchProducts,
  fetchProduct,
  addProduct,
  editProduct,
  removeProduct,
  filterProductsController
} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', fetchProducts);
router.get('/:productId', fetchProduct);
router.post('/filter', filterProductsController);
router.post('/', authMiddleware, adminMiddleware, addProduct); 
router.put('/:productId', authMiddleware, adminMiddleware, editProduct); 
router.delete('/:productId', authMiddleware, adminMiddleware, removeProduct); 

module.exports = router;


