const { createOrder, addOrderItem, getOrdersByUserId, getOrderItems } = require('../models/orderModel');
const { getCartByUserId, getCartItems } = require('../models/cartModel');

const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Корзина не найдена' });
    }
    const cartItems = await getCartItems(cart.id);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Корзина пуста' });
    }

    const order = await createOrder(userId);

    for (let item of cartItems) {
      await addOrderItem(order.id, item.product_id, item.quantity, item.price);
    }

    res.status(201).json({ order, items: cartItems });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ошибка при создании заказа' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении заказов' });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const items = await getOrderItems(orderId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении деталей заказа' });
  }
};

module.exports = { createOrderFromCart, getUserOrders, getOrderDetails };
