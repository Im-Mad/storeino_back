const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);

router
    .route('/:name')
    .get(categoryController.getCategorie);

module.exports = router;