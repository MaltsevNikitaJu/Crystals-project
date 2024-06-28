const express = require('express');
const { listProducts, addProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', listProducts);
router.post('/add', authMiddleware, addProduct);

module.exports = router;

