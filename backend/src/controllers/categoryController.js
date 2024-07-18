const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../models/categoryModel');

const fetchCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении списка категорий' });
  }
};

const fetchCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении категории' });
  }
};

const addCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ошибка при добавлении категории' });
  }
};

const editCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryData = req.body;
    const updatedCategory = await updateCategory(categoryId, categoryData);
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении категории' });
  }
};

const removeCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deleted = await deleteCategory(categoryId);
    if (!deleted) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    res.status(200).json({ message: 'Категория успешно удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении категории' });
  }
};

module.exports = {
  fetchCategories,
  fetchCategory,
  addCategory,
  editCategory,
  removeCategory
};
