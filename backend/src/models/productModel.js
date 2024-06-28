const db = require('../db/connection');

const getAllProducts = async () => {
    return await db('products').select('*');
  };
  
  const createProduct = async (product) => {
    const [newProduct] = await db('products').insert(product).returning('*');
    return newProduct;
  };

module.exports ={
    getAllProducts,
    createProduct
}