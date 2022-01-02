const express = require('express')
const router = express.Router();
const { getProfile, editProfile, updateNutrient } = require('../controllers/clientController');
const { verifyToken } = require('../utils/verify')

router.get('/profile', verifyToken, getProfile)
router.post('/edit-profile', verifyToken, editProfile)
router.post('/update-nutrient', verifyToken, updateNutrient)

module.exports = router;