const express = require("express");
const LocationController = require('../controllers/LocationConroller')


const router = express.Router();

router
    .route('/countries')
    .get(LocationController.getCountries);
router.route('/provinces')
    .get(LocationController.getProvinces)


module.exports = router;