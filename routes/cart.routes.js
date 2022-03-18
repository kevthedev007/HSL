const express = require("express")
const router = express.Router();
const { getCartItems, addToCart, removeFromCart, addSupplementsToCart } = require("../controllers/cart.controller");
const { verifyToken } = require('../utils/verify');

router.get("/", verifyToken, getCartItems);
router.post("/supplement-cart", verifyToken, addSupplementsToCart);
router.post("/:productId", verifyToken, addToCart);
router.delete("/:productId", verifyToken, removeFromCart);

module.exports = router;