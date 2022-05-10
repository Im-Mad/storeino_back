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
  .get(categoryController.getCategory);

router
  .route('/:slug/products')
  .get(productController.productInCategory);

router
  .route('/')
  .get(categoryController.getAllCategories)

router.use(authController.protect);

router.post('/',categoryController.createCategory);
router.delete('/:slug', categoryController.deleteCategory);


module.exports = router;