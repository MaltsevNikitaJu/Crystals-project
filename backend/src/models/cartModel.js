const db = require('../db/connection')

const createCart = async (userId) => {
    const [newCart] = await db('carts').insert({user_id:userId}).returning('*');
    return newCart;
}

const getCartByUserId = async (userId) => {
    return await db('carts').where({user_id:userId}).first();
}

const addItemToCart = async (cartId,productId,quantity) => {
    const [cartItem] = await db('cart_items').insert({cart_id:cartId,product_id:productId,quantity}).returning('*');
    return cartItem;
}

const getCartItems = async (cartId) => {
    return await db('cart_items').where({cart_id:cartId}).select('*')
};

module.exports = {createCart,getCartByUserId,addItemToCart,getCartItems};