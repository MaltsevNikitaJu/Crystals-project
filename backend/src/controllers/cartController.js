const { createCart, getCartByUserId, addItemToCart, getCartItems } = require('../models/cartModel');

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await getCartByUserId(userId);
    if (!cart) {
      cart = await createCart(userId);
    }
    const items = await getCartItems(cart.id);
    res.status(200).json({ cart, items });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при выборе корзины' });
  }
};

const addItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Корзина не найдена' });
    }
    const item = await addItemToCart(cart.id, productId, quantity);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении товара в корзину' });
  }
};

module.exports = { getCart, addItem };
