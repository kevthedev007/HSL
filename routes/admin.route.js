const express = require('express')
const router = express.Router();
const { verifyToken, admin_role } = require('../utils/verify')
const { getForms, getFormById, getFormsByReport, getFormsByEndorsed, writeReport, endorseReport } = require('../controllers/admin.controller')


router.get('/nutrient-forms', [verifyToken, admin_role], getForms);
router.get('/nutrient-forms/:id', [verifyToken, admin_role], getFormById);
router.get('/forms-report', [verifyToken, admin_role], getFormsByReport);
router.post('/forms-report/:formId', [verifyToken, admin_role], writeReport);
router.get('/forms-endorsed', [verifyToken, admin_role], getFormsByEndorsed);
router.put('/forms-endorsed/:formId', [verifyToken, admin_role], endorseReport);


module.exports = router; 