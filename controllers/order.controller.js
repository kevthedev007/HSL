const { Order, Order_Items, Product, User, Cart } = require("../models/index");
const createError = require("http-errors");
const sequelize = require("sequelize");

const createOrder = async (req, res, next) => {
  const { name, address, email, phone, shipping_method, shipping_price } = req.body;

  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: {
        model: Product, as: 'product'
      }
    })

    /* Get Cart Total */
    let cartTotal = 0;
    cartItems.forEach(item => {
      cartTotal += item.quantity * item.product.selling_price;
    });
    let orderTotal = cartTotal + shipping_price;

    const transaction = await sequelize.transaction();
    await Order.create({
      userId: req.user.id,
      name,
      email,
      address,
      phone,
      shipping_method,
      shipping_price,
      discount: 0,
      orderItems_total: cartTotal,
      order_total: orderTotal,
    }, { transaction })

    cartItems.forEach(async (item) => {
      await Order_Items.create({
        orderId: order.id,
        productId: item.product.id,
        quantity: item.quantity,
        price: item.price,
      }, { transaction })
    })

    await transaction.commit();
    return res.status(200).json({ status: true, message: 'order created successfully' })
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
}

//TODO: VISITOR ORDER
const createVisitorOrder = async (req, res, next) => {
  const { name, address, email, phone, shipping_method, shipping_price } = req.body;

  try {
    const transaction = await sequelize.transaction();
    await Order.create({
      name,
      email,
      address,
      phone,
      shipping_method,
      shipping_price,
      discount: 0,
      orderItems_total: req.body.orderItemsTotal,
      order_total: req.body.orderTotal,
    }, { transaction })

    // cartItems.forEach(async (item) => {
    //   await Order_Items.create({
    //     orderId: order.id,
    //     productId: item.product.id,
    //     quantity: item.quantity,
    //     price: item.price,
    //   }, { transaction })
    // })

    await transaction.commit();
    return res.status(200).json({ status: true, message: 'order created successfully' })
  } catch (error) {
    await transaction.rollback();
    next(error)
  }
}