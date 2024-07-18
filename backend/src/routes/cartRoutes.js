const express = require('express');
const { getCart, addItem, updateItemQuantity, removeItem } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addItem);
router.post('/update', authMiddleware, updateItemQuantity);
router.post('/remove', authMiddleware, removeItem);

module.exports = router;
