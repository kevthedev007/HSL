const { Cart, User, Product } = require("../models/index");
const createError = require("http-errors");
const sequelize = require("sequelize")

const getCartItems = async (req, res, next) => {
  try {
    if (!req.user.id) {
      throw createError.NotFound({ status: false, message: "Load user cart items from local storage" })
    }
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'productId', 'quantity', 'price'],
      include: {
        model: Product, as: 'product',
        attributes: ['name', 'category', 'selling_price']
      }
    })

    if (!cartItems) {
      throw createError.NotFound("You have no items in your cart")
    }

    /* Cart Items Count */
    let count = 0;
    cartItems.forEach(item => {
      count += item.quantity;
    });

    /* Get Cart Total */
    let total = 0;
    cartItems.forEach(item => {
      total += item.quantity * item.product.selling_price;
    })

    return res.status(200).json({
      cartItems,
      TotalItems: count,
      TotalAmount: total
    });
  } catch (error) {
    next(error);
  }
}

//send receive an array of products id
const addSupplementsToCart = async (req, res, next) => {
  const items = req.body.items; //array of products id

  try {
    items.forEach(async (item) => {
      const product = await Product.findOne({ where: { id: item.id } });
      const cartItem = await Cart.findOne({
        where: { userId: req.user.id, productId: product.id }
      });
      if (cartItem) {
        cartItem.quantity = cartItem.quantity + 1;
        cartItem.price = cartItem.quantity * product.selling_price;
        await cartItem.save();
      } else {
        await Cart.create({
          userId: req.user.id,
          productId: req.params.productId,
          quantity: 1,
          price: product.selling_price,
        })
      }
    })
    return res.status(200).send("Items added to cart successfully")
  } catch (error) {
    next(error);
  }
}

const addToCart = async (req, res, next) => {
  //check if product exists
  try {
    const checkProduct = await Product.findOne({ where: { id: req.params.productId } });
    if (!checkProduct) throw createError.NotFound("Product does not exist");

    //check if product already exists in cart
    const cartItem = await Cart.findOne({
      where: { userId: req.user.id, productId: req.params.productId }
    });
    if (cartItem) {
      cartItem.quantity = cartItem.quantity + 1;
      cartItem.price = cartItem.quantity * checkProduct.selling_price;
      await cartItem.save();
      return res.end();
    } else {
      await Cart.create({
        userId: req.user.id,
        productId: req.params.productId,
        quantity: 1,
        price: checkProduct.selling_price,
      })
      return res.end();
    }
  } catch (error) {
    next(error)
  }

}

const removeFromCart = async (req, res, next) => {
  try {
    const cartItem = await Cart.findOne({
      where: { userId: req.user.id, productId: req.params.productId },
      include: 'product',
    })
    if (cartItem.quantity > 1) {
      cartItem.quantity = cartItem.quantity - 1;
      cartItem.price = cartItem.quantity * cartItem.product.selling_price;
      await cartItem.save();
      return res.end();
    } else {
      await cartItem.destroy();
      return res.end();
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCartItems,
  addSupplementsToCart,
  addToCart,
  removeFromCart
}