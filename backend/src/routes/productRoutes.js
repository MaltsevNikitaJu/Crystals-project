const express = require('express');
const {
  fetchProducts,
  fetchProduct,
  addProduct,
  editProduct,
  removeProduct,
  filterProductsController,
  fetchProductByName,
  fetchRandomProducts,
  fetchProductsByCategory
} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', fetchProducts);
router.get('/:productId', fetchProduct);
router.get('/:productName',fetchProductByName);
router.get('/random', fetchRandomProducts);
router.get('/categories', fetchProductsByCategory);
router.post('/filter', filterProductsController);
router.post('/', authMiddleware, adminMiddleware, addProduct); 
router.put('/:productId', authMiddleware, adminMiddleware, editProduct); 
router.delete('/:productId', authMiddleware, adminMiddleware, removeProduct); 

module.exports = router;


