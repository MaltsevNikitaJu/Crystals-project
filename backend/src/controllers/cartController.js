const {
  createCart,
  getCartByUserId,
  addItemToCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} = require("../models/cartModel");
const { getProductById } = require("../models/productModel");

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
    res.status(500).json({ error: "Ошибка при получении корзины" });
  }
};

const addItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Товар не найден" });
    }
    const price = product.price;
    let cart = await getCartByUserId(userId);
    if (!cart) {
      cart = await createCart(userId);
    }
    const item = await addItemToCart(cart.id, productId, quantity, price);
    res.status(201).json(item);
  } catch (error) {
    console.error("Ошибка при добавлении товара в корзину:", error);
    res.status(500).json({ error: "Ошибка при добавлении товара в корзину" });
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    let cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: "Корзина не найдена" });
    }
    const item = await updateCartItemQuantity(cart.id, productId, quantity);
    res.status(200).json(item);
  } catch (error) {
    console.error("Ошибка при обновлении количества товара в корзине:", error);
    res
      .status(500)
      .json({ error: "Ошибка при обновлении количества товара в корзине" });
  }
};

const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    let cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: "Корзина не найдена" });
    }
    await removeCartItem(cart.id, productId);
    res.status(200).json({ message: "Товар удален из корзины" });
  } catch (error) {
    console.error("Ошибка при удалении товара из корзины:", error);
    res.status(500).json({ error: "Ошибка при удалении товара из корзины" });
  }
};

module.exports = { getCart, addItem, updateItemQuantity, removeItem };
