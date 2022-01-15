const express = require('express')
const router = express.Router();
const { dashboard, getProfile, editProfile, updateNutrient, getReport } = require('../controllers/clientController');
const { verifyToken } = require('../utils/verify')

router.get('/dashboard', verifyToken, dashboard)
router.get('/profile', verifyToken, getProfile)
router.put('/edit-profile', verifyToken, editProfile)
router.put('/update-nutrient/:id', verifyToken, updateNutrient)
router.get('/report', verifyToken, getReport)

module.exports = router;