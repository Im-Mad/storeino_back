const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router
    .route('/')
    .get(productController.getAllItems);

router
    .route('/:id')
    .get(productController.getOneItem)

module.exports = router;