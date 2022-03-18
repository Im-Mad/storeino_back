const express = require('express');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');


const router = express.Router();


router
    .route('/:category')
    .get(productController.productInCategory)
    .delete(categoryController.deleteCategory);

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);



module.exports = router;