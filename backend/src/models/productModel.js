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

const getProductByName = async (productName) => {
  return await db('products')
    .join('categories', 'products.category_id', 'categories.id')
    .where('products.name', productName)
    .select('products.*', 'categories.name as category_name')
    .first();
};

const createProduct = async (productData) => {
  const { name, description, price, stock, image_url, protein, fat, carbohydrates, calories, category_id, composition, tags, mass } = productData;
  const [newProduct] = await db('products')
    .insert({ name, description, price, stock, image_url, protein, fat, carbohydrates, calories, category_id, composition, tags, mass })
    .returning('*');
  return newProduct;
};

const updateProduct = async (id, productData) => {
  const { name, description, price, stock, image_url, protein, fat, carbohydrates, calories, category_id, composition, tags, mass } = productData;
  const [updatedProduct] = await db('products')
    .where({ id })
    .update({ name, description, price, stock, image_url, protein, fat, carbohydrates, calories, category_id, composition, tags, mass })
    .returning('*');
  return updatedProduct;
};

const filterProductsByTag = async (filters) => {
  const query = db('products')
    .join('categories', 'products.category_id', 'categories.id')
    .select('products.*', 'categories.name as category_name');

  const components = filters.tags.split(',').map(component => component.trim().toLowerCase());
  query.where(function() {
    components.forEach(component => {
      this.andWhereRaw('LOWER(products.tags) LIKE ?', `%${component}%`);
    });
  });
  return await query;
};

const deleteProduct = async (id) => {
  return await db('products').where({ id }).del();
};

const getProductsByCategory = async () => {
  const categories = await db('categories').select('*');
  const productsByCategory = {};

  for (const category of categories) {
    const products = await db('products')
      .where('products.category_id', category.id)
      .select('products.*');
    productsByCategory[category.name] = products;
  }

  return productsByCategory;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProductsByTag,
  getProductByName,
  getProductsByCategory
};
