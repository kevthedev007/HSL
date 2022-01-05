const express = require('express')
const router = express.Router();
const { dashboard, getProfile, editProfile, updateNutrient } = require('../controllers/clientController');
const { verifyToken } = require('../utils/verify')

router.get('/dashboard', verifyToken, dashboard)
router.get('/profile', verifyToken, getProfile)
router.put('/edit-profile', verifyToken, editProfile)
router.put('/update-nutrient', verifyToken, updateNutrient)

module.exports = router;