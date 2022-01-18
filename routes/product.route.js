const express = require('express')
const router = express.Router();
const { verifyToken, admin_role } = require('../utils/verify')
const { addProduct, getAllProducts, getProductById, editProduct } = require('../controllers/product.controller')
const upload = require('../utils/multer');

router.get('/', verifyToken, getAllProducts);
router.get('/:id', verifyToken, getProductById);
router.post('/add-product', [verifyToken, admin_role], addProduct);
router.put('/update-product/:id', [verifyToken, admin_role], editProduct);



module.exports = router;