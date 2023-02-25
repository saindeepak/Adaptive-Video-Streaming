const express = require("express");
const router = express.Router();
const controller = require('../controllers/serviceController');

// Entry route of gateway
router.get("/:resource", controller.service_get);

module.exports = router;
