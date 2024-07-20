const {
  createOrder,
  addOrderItem,
  getOrdersByUserId,
  getOrderItems,
  getOrderById,
  addPaymentIdToOrder,
  getOrderByPaymentId,
  updateStatus,
} = require("../models/orderModel");
const { getCartByUserId, getCartItems } = require("../models/cartModel");
const generateIdempotenceKey = require("../utils/idempotenceKeyGenerator");
const { checkout } = require("../paymentService/yookassa");

const createPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: "Корзина не найдена" });
    }

    const cartItems = await getCartItems(cart.id);
    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Корзина пуста" });
    }
    const idempotenceKey = generateIdempotenceKey();
    const order = await createOrder(userId, idempotenceKey);
    for (let item of cartItems) {
      await addOrderItem(order.id, item.product_id, item.quantity, item.price);
    }

    const createPayload = {
      amount: {
        value: cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2),
        currency: "RUB",
      },
      payment_method_data: {
        type: "bank_card",
      },
      confirmation: {
        type: "redirect",
        return_url: "http://localhost:5173/",
      },
    };

    const payment = await checkout.createPayment(createPayload, idempotenceKey);

    await addPaymentIdToOrder(order.id, payment.id);
    res.status(201).json({
      confirmation_url: payment.confirmation.confirmation_url,
      paymentId: payment.id,
      value: payment.amount.value,
    });
  } catch (error) {
    console.error("Ошибка при создании платежа:", error);
    res.status(500).json({ error: "Ошибка при создании платежа" });
  }
};

const getPaymentDetails = async (req, res) => {
  const paymentId = req.params.paymentId;
  try {
    const payment = await checkout.getPayment(paymentId);
    res.status(200).json(payment.status);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при получении информации о платеже" });
  }
};

const catchPayment = async (req, res) => {
  const paymentId = req.params.paymentId;
  const { value } = req.body;

  try {
    const order = await getOrderByPaymentId(paymentId);
    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }
    const idempotenceKey = order.idempotence_key;

    const createPayload = {
      amount: {
        value: value,
        currency: "RUB",
      },
    };

    const payment = await checkout.capturePayment(
      paymentId,
      createPayload,
      idempotenceKey
    );
    res.status(201).json({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при оплате" });
  }
};

const updatePaymentStatus = async (req, res) => {
  const paymentId = req.params.paymentId;
  const { status } = req.body;
  try {
    const updatedStatus = await updateStatus(paymentId, status);
    res.status(200).json(updatedStatus);
  } catch (error) {
    console.error("Ошибка при изменении статуса заказа:", error);
    res.status(500).json({ error: "Ошибка при изменении статуса заказа" });
  }
};

const getUserOrdersWithItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getOrdersByUserId(userId);
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await getOrderItems(order.id);
        return { ...order, items };
      })
    );
    res.status(200).json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении заказов" });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении заказов" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const items = await getOrderItems(orderId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении деталей заказа" });
  }
};

module.exports = {
  createPayment,
  getUserOrders,
  getOrderDetails,
  getPaymentDetails,
  catchPayment,
  updatePaymentStatus,
  getUserOrdersWithItems,
};
