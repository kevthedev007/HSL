const express = require('express')
const router = express.Router();
const { verifyToken, admin_role } = require('../utils/verify')
const { getForms, getFormById, getFormsByReport, getFormsByEndorsed } = require('../controllers/adminController')


router.get('/nutrient-forms', [verifyToken, admin_role], getForms);
router.get('/nutrient-forms/:id', [verifyToken, admin_role], getFormById);
router.get('/forms-report', [verifyToken, admin_role], getFormsByReport);
router.get('/forms-endorsed', [verifyToken, admin_role], getFormsByEndorsed);

module.exports = router; 