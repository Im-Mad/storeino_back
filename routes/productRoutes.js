const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router
    .route('/:id')
    .get(productController.getOneProduct);

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);

module.exports = router;