const express = require('express');
const { connect, listOfAvailablePorts, getPlcId, disconnectPort } = require('../controllers/plcController');

const router = express.Router();

router.route("/connect").post(connect)

router.route("/list").get(listOfAvailablePorts)

router.route("/getPlcId").post(getPlcId)

router.route("/disconnect").post(disconnectPort)

module.exports = router;