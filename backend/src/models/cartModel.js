const db = require('../db/connection');

const createCart = async (userId) => {
  const [newCart] = await db('carts').insert({ user_id: userId }).returning('*');
  return newCart;
};

const getCartByUserId = async (userId) => {
  return await db('carts').where({ user_id: userId }).first();
};

const addItemToCart = async (cartId, productId, quantity, price) => {
  const [cartItem] = await db('cart_items').insert({ cart_id: cartId, product_id: productId, quantity, price }).returning('*');
  return cartItem;
};

const getCartItems = async (cartId) => {
  return await db('cart_items')
    .join('products', 'cart_items.product_id', 'products.id')
    .where({ cart_id: cartId })
    .select('cart_items.*', 'products.name', 'products.image_url', 'products.description', 'products.composition', 'products.calories', 'products.protein', 'products.fat', 'products.carbohydrates', 'products.mass');
};

const updateCartItemQuantity = async (cartId, productId, quantity) => {
  const [updatedItem] = await db('cart_items')
    .where({ cart_id: cartId, product_id: productId })
    .update({ quantity })
    .returning('*');
  return updatedItem;
};

const removeCartItem = async (cartId, productId) => {
  await db('cart_items')
    .where({ cart_id: cartId, product_id: productId })
    .del();
};

module.exports = { createCart, getCartByUserId, addItemToCart, getCartItems, updateCartItemQuantity, removeCartItem };
