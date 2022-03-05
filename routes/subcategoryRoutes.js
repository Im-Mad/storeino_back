const express = require('express');
const subCategoryController = require('../controllers/subcategoryController');

const router = express.Router();

router
    .route('/')
    .get(subCategoryController.getAllSubcategories)
    .post(subCategoryController.createSubcategory);

router
    .route('/:name')
    .get(subCategoryController.getSubcategory);

module.exports = router;