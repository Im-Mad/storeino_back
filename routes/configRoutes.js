const express = require('express');
const authController = require("../controllers/authController");
const configController = require("../controllers/configController");

const router = express.Router();


router.get('/banner', configController.getBanner);
router.get('/top', configController.getTopCategories);
router.get('/slides', configController.getSlides);

router.use(authController.protect)

router.patch('/banner', configController.editBanner);
router.patch('/top', configController.editTopCategories);
router.patch('/slides', configController.editSlides);

module.exports = router;