const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts
} = require("../models/productModel");

const fetchProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении списка продуктов" });
  }
};

const fetchProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Продукт не найден" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Ошибка при получении продукта" });
  }
};

const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await createProduct(productData);
    console.log(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error);
    res.status(500).json({ error: "Ошибка при добавлении продукта" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const updatedProduct = await updateProduct(productId, productData);
    if (!updatedProduct) {
      return res.status(404).json({ error: "Продукт не найден" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении продукта" });
  }
};

const filterProductsController = async (req, res) => {
  try {
    const filters = req.body;
    const products = await filterProducts(filters);
    res.status(200).json(products);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Ошибка при фильтрации продуктов" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await deleteProduct(productId);
    if (!deleted) {
      return res.status(404).json({ error: "Продукт не найден" });
    }
    res.status(200).json({ message: "Продукт успешно удален" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении продукта" });
  }
};

module.exports = {
  fetchProducts,
  fetchProduct,
  addProduct,
  editProduct,
  removeProduct,
  filterProductsController
};
