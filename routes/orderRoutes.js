const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router
    .route('/create')
    .post(orderController.placeOrder);

module.exports = router;