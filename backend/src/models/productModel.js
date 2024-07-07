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

const filterProducts = async (filters) => {
  const query = db('products')
    .join('categories', 'products.category_id', 'categories.id')
    .select('products.*', 'categories.name as category_name');

  if (filters.name) {
    query.where('products.name', 'like', `%${filters.name}%`);
  }
  if (filters.category_id) {
    query.where('products.category_id', parseInt(filters.category_id, 10));
  }
  if (filters.price_min) {
    query.where('products.price', '>=', parseFloat(filters.price_min));
  }
  if (filters.price_max) {
    query.where('products.price', '<=', parseFloat(filters.price_max));
  }
  if (filters.is_vegan) {
    query.where('products.is_vegan', filters.is_vegan === 'true');
  }
  if (filters.is_healthy) {
    query.where('products.is_healthy', filters.is_healthy === 'true');
  }
  if (filters.composition) {
    const components = filters.composition.split(',').map(component => component.trim());
    query.where(function() {
      components.forEach(component => {
        this.orWhere('products.composition', 'like', `%${component}%`);
      });
    });
  }

  return await query;
};

const deleteProduct = async (id) => {
  return await db('products').where({ id }).del();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts
};
