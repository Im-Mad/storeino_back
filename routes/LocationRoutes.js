const express = require("express");
const LocationController = require('../controllers/LocationConroller')

const router = express.Router();

router
    .route('/countries')
    .get(LocationController.getCountries);
router.route('/provinces')
    .get(LocationController.getProvinces);

router.route('/shippers')
    .get(LocationController.getShippers);
router.route('/methods')
    .get(LocationController.getMethods);

module.exports = router;