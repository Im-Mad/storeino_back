const express = require('express');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');


const router = express.Router();

router
    .route('/root')
    .get(categoryController.rootCategories);

router
    .route('/:slug')
    .get(categoryController.getCategory)
    .delete(categoryController.deleteCategory);

router
    .route('/:slug/products')
    .get(productController.productInCategory);

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);



module.exports = router;