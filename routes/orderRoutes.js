const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route('/create')
    .post(orderController.placeOrder);

router.use(authController.protect);

router.get('/', orderController.getAllOrders);
module.exports = router;