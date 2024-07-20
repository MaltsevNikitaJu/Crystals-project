const db = require("../db/connection");

const createOrder = async (userId, idempotenceKey) => {
  const [newOrder] = await db("orders")
    .insert({ user_id: userId, idempotence_key: idempotenceKey })
    .returning("*");
  return newOrder;
};

const addOrderItem = async (orderId, productId, quantity, price) => {
  const [orderItem] = await db("order_items")
    .insert({ order_id: orderId, product_id: productId, quantity, price })
    .returning("*");
  return orderItem;
};

const getOrdersByUserId = async (userId) => {
  return await db("orders").where({ user_id: userId }).select("*");
};

const getOrderItems = async (orderId) => {
  return await db("order_items").where({ order_id: orderId }).select("*");
};

const getOrderById = async (orderId) => {
  return await db("orders").where({ id: orderId }).first();
};
const getOrderByPaymentId = async (paymentId) => {
  return await db("orders").where({ payment_id: paymentId }).first();
};

const addPaymentIdToOrder = async (orderId, paymentId) => {
  return await db("orders")
    .where({ id: orderId })
    .update({ payment_id: paymentId });
};

const updateStatus = async (paymentId, status) => {
  return await db("orders")
    .where({ payment_id: paymentId })
    .update({ status: status })
    .returning("*");
};

module.exports = {
  createOrder,
  addOrderItem,
  getOrdersByUserId,
  getOrderItems,
  getOrderById,
  addPaymentIdToOrder,
  getOrderByPaymentId,
  updateStatus,
};
