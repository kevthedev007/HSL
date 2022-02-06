const { User, Client_Details, Nutrient_Form, Product, Product_Detail } = require('../models/index');
const cloudinary = require('../utils/cloudinary');
const createError = require('http-errors');


const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'cloudinary_id'] },
      // include: {
      //   model: Product_Detail, as: 'product_details',
      //   attributes: { exclude: ['productId', 'createdAt', 'updatedAt'] }
      // }
    })

    return res.status(200).json({ products })

  } catch (error) {
    next(error)
  }
}


const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'cloudinary_id'] },
      include: {
        model: Product_Detail, as: 'product_details',
        attributes: { exclude: ['productId', 'createdAt', 'updatedAt'] }
      }
    })

    if (!product) throw createError.NotFound('Product does not exist')

    return res.status(200).json({ product })

  } catch (error) {
    next(error)
  }
}

const addProduct = async (req, res, next) => {
  try {
    const { name, price, selling_price, category, store, image, body_care, habits, lifestyle_goals, gender, age, career_type, brands } = req.body;

    const result = await cloudinary.uploader.upload(image);
    console.log(result)

    //create instance of product
    const product = await Product.create({
      name,
      price,
      selling_price,
      category,
      store,
      avatar: result.secure_url,
      cloudinary_id: result.public_id
    })


    const details = await Product_Detail.create({
      productId: product.id,
      body_care, habits, lifestyle_goals, gender, age, career_type, brands
    })

    return res.status(201).json({ message: 'Product has been added to the store successfully' })

  } catch (error) {
    next(error)
  }
}


const editProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'cloudinary_id'] },
      include: {
        model: Product_Detail, as: 'product_details',
        attributes: { exclude: ['productId', 'createdAt', 'updatedAt'] }
      }
    })

    if (!product) throw createError.NotFound('product does not exist')

    const productMatch = {
      name: req.body.name || product.name,
      price: req.body.price || product.price,
      selling_price: req.body.selling_price || product.selling_price,
      category: req.body.category || product.category,
      store: req.body.store || product.store || null,
      availability: req.body.availability || product.availability
    };

    const detailsMatch = {
      body_care: req.body.body_care || product.product_details.body_care || null,
      habits: req.body.habits || product.product_details.habits || null,
      lifestyle_goals: req.body.lifestyle_goals || product.product_details.lifestyle_goals || null,
      gender: req.body.gender || product.product_details.gender || null,
      age: req.body.age || product.product_details.age || null,
      career_type: req.body.career_type || product.product_details.career_type || null,
      brands: req.body.brands || product.product_details.brands || null
    };

    const productUpdate = await Product.update(productMatch, { where: { id } });
    const detailsUpdate = await Product_Detail.update(detailsMatch, { where: { productId: id } })

    res.status(200).json({ message: "Product updated successfully" })

  } catch (error) {
    next(error)
  }
}


module.exports = { getAllProducts, getProductById, addProduct, editProduct }