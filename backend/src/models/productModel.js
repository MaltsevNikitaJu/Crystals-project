const db = require('../db/connection');

const getAllProducts = async () => {
  return await db('products')
    .join('categories', 'products.category_id', 'categories.id')
    .select('products.*', 'categories.name as category_name');
};

const getProductById = async (id) => {
  return await db('products')
    .join('categories', 'products.category_id', 'categories.id')
    .where('products.id', id)
    .select('products.*', 'categories.name as category_name')
    .first();
};

const createProduct = async (productData) => {
  const { name, description, price, stock, image_url, protein, fat, carbohydrates, calories, category_id, composition, is_vegan, is_healthy } = productData;
  const [newProduct] = await db('products')
    .insert({ name, description, price, stock, image_url, protein, fat, carbohydrates, calories, category_id, composition, is_vegan, is_healthy })
    .returning('*');
  return newProduct;
};

const updateProduct = async (id, productData) => {
  const { name, description, price, stock, image_url, protein, fat, carbohydrates, calories, category_id, composition, is_vegan, is_healthy } = productData;
  const [updatedProduct] = await db('products')
    .where({ id })
    .update({ name, description, price, stock, image_url, protein, fat, carbohydrates, calories, category_id, composition, is_vegan, is_healthy })
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
