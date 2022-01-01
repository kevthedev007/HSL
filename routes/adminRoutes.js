const express = require('express')
const router = express.Router();
const { getForms } = require('../controllers/adminController')


router.get('/nutrient-forms', getForms);


module.exports = router;