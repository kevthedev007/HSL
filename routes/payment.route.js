const express = require("express");
const router = express.Router();
const { verify, webhook } = require('../controllers/payment.controller')


router.post('/verify', verify);
router.post('/webhook', webhook);


module.exports = router