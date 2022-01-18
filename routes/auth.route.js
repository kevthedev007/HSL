const express = require('express')
const router = express.Router();
const { clientRegister, clientSignin, adminSignin, createAdmin } = require('../controllers/auth.controller')

router.post('/register', clientRegister);
router.post('/signin', clientSignin);
router.post('/admin-register', createAdmin);
router.post('/admin-signin', adminSignin)


module.exports = router