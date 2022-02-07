const express = require('express')
const router = express.Router();
const { getTestimonials, postTestimonial } = require('../controllers/health_testimonial.controller')
const { verifyToken } = require('../utils/verify')

router.get('/', getTestimonials)
router.post('/', verifyToken, postTestimonial)


module.exports = router;