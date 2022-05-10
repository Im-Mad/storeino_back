const express = require('express');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const authController = require("../controllers/authController");


const router = express.Router();

router
  .route('/root')
  .get(categoryController.rootCategories);

router
  .route('/:slug')
  .get(categoryController.getCategory)
  .use(authController.protect)
  .delete(categoryController.deleteCategory);

router
  .route('/:slug/products')
  .get(productController.productInCategory);

router
  .route('/')
  .get(categoryController.getAllCategories)
  .use(authController.protect)
  .post(categoryController.createCategory);



module.exports = router;