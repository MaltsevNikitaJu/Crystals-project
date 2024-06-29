const express = require('express');
const { createOrderFromCart, getUserOrders, getOrderDetails } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createOrderFromCart);
router.get('/', authMiddleware, getUserOrders);
router.get('/:orderId', authMiddleware, getOrderDetails);

module.exports = router;
