const db = require ('../db/connection')

const createOrder = async (userId) => {
    const [newOrder] = await db('orders').insert({user_id:userId}).returning('*');
    return newOrder;
};

const addOrderItem = async (orderId,productId,quantity,price) => {
    const [orderItem] = await db('order_items').insert({order_id:orderId,product_id:productId,quantity,price}).returning('*')
    return orderItem;
};

const getOrdersByUserId = async(userId) => {
    return await db('orders').where({user_id:userId}).select('*')
};

const getOrderItems = async (orderId) => {
    return await db('order_items').where({order_id:orderId}).select('*')
}

module.exports = {createOrder,addOrderItem,getOrdersByUserId,getOrderItems}