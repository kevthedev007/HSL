const express = require('express')
const router = express.Router();
const { verifyToken, admin_role } = require('../utils/verify')
const { getForms, getFormById, addProduct, getAllProducts } = require('../controllers/adminController')
const upload = require('../utils/multer');

router.get('/nutrient-forms', [verifyToken, admin_role], getForms);
router.get('/nutrient-forms/:id', [verifyToken, admin_role], getFormById);
router.post('/add-product', [verifyToken, admin_role], addProduct)
router.get('/products', [verifyToken, admin_role], getAllProducts)

module.exports = router; 