const { getAllProducts,createProduct} = require('../models/productModel');

const listProducts = async(req,res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error:'Ошибка при загрузке продуктов'})
    }
}

const addProduct = async (req,res) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({error:'Ошибка при добавлении продукта'})
    }
}

module.exports = { listProducts, addProduct}