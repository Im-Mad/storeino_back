const express = require('express');
const productController = require('../controllers/productController');
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route('/:id')
  .get(productController.getOneProduct);

router
  .route('/')
  .get(productController.getAllProducts);

router
  .use(authController.protect)

router
  .route('/')
  .post(productController.createProduct);

module.exports = router;