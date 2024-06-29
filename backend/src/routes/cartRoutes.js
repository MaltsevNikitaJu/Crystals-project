const express = require('express');
const { getCart, addItem } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addItem);

module.exports = router;
