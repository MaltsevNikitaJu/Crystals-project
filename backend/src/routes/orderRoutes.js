const express = require("express");
const {
  createPayment,
  getUserOrders,
  getOrderDetails,
  getPaymentDetails,
  catchPayment,
  updatePaymentStatus,
  getUserOrdersWithItems,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/pay", authMiddleware, createPayment);
router.post("/pay/:paymentId", authMiddleware, getPaymentDetails);
router.post("/pay/status/:paymentId", authMiddleware, updatePaymentStatus);
router.get("/user-orders", authMiddleware, getUserOrdersWithItems);
router.post("/pay/catch/:paymentId", authMiddleware, catchPayment);
router.get("/", authMiddleware, getUserOrders);
router.get("/:orderId", authMiddleware, getOrderDetails);

module.exports = router;
