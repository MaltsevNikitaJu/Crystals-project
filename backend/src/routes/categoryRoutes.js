const express = require('express');
const {
  fetchCategories,
  fetchCategory,
  addCategory,
  editCategory,
  removeCategory
} = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', fetchCategories);
router.get('/:categoryId', fetchCategory);
router.post('/', authMiddleware, adminMiddleware, addCategory);
router.put('/:categoryId', authMiddleware, adminMiddleware, editCategory);
router.delete('/:categoryId', authMiddleware, adminMiddleware, removeCategory);

module.exports = router;
