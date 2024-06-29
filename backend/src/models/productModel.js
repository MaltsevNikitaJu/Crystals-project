const db = require('../db/connection');

const getAllProducts = async () => {
  return await db('products').select('*');
};

const getProductById = async (id) => {
  return await db('products').where({ id }).first();
};

const createProduct = async (productData) => {
  const { name, description, price, stock, image_url, protein, fat, carbohydrates, calories } = productData;
  const [newProduct] = await db('products')
    .insert({ name, description, price, stock, image_url, protein, fat, carbohydrates, calories })
    .returning('*');
  return newProduct;
};

const updateProduct = async (id, productData) => {
  const { name, description, price, stock, image_url, protein, fat, carbohydrates, calories } = productData;
  const [updatedProduct] = await db('products')
    .where({ id })
    .update({ name, description, price, stock, image_url, protein, fat, carbohydrates, calories })
    .returning('*');
  return updatedProduct;
};

const deleteProduct = async (id) => {
  return await db('products').where({ id }).del();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
