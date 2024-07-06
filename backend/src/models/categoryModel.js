const db = require("../db/connection");

const getAllCategories = async () => {
  return await db("categories").select("*");
};

const getCategoryById = async (id) => {
  return await db("categories").where({ id }).first();
};

const createCategory = async (categoryData) => {
  const { name } = categoryData;
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
