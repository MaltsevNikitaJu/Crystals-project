const db = require("../db/connection");

const getAllCategories = async () => {
  return await db("categories").select("*");
};

const getCategoryById = async (id) => {
  return await db("categories").where({ id }).first();
};

const createCategory = async (categoryData) => {
  const { name } = categoryData;

  let existingCategory = await db("categories").where({ name }).first();
  if (existingCategory) {
    throw new Error(`Category with name "${name}" already exists.`);
  }

  const maxIdResult = await db("categories").max("id as maxId").first();
  const maxId = maxIdResult.maxId || 0;
  await db.raw(`SELECT setval('categories_id_seq', ?)`, [maxId + 1]);

  const [newCategory] = await db("categories").insert({ name }).returning("*");
  return newCategory;
};


const updateCategory = async (id, categoryData) => {
  const { name, description } = categoryData;
  const [updatedCategory] = await db("categories")
    .where({ id })
    .update({ name, description })
    .returning("*");
  return updatedCategory;
};

const deleteCategory = async (id) => {
  return await db("categories").where({ id }).del();
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
