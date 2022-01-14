const { User, Client_Details, Nutrient_Form, Product, Product_Detail } = require('../models/index');
const sequelize = require('sequelize');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const { image } = require('../utils/cloudinary');


const getForms = async (req, res) => {
  try {
    const forms = await Nutrient_Form.findAll({
      include: 'client',
    });

    const data = forms.map(form => {
      return {
        username: form.client.username,
        email: form.client.email,
        weight: form.weight,
        height: form.height,
        habits: form.habits,
        current_health_complaints: form.current_health_complaints,
        report: form.result,
        endorsed: form.endorsed
      }
    })
    return res.status(200).json(data)

  } catch (error) {
    res.status(400).json(error.messsage)
  }
}

const getFormById = async (req, res) => {
  try {
    const id = req.params.id;

    const form = await Nutrient_Form.findOne({
      where: { id },
      include: 'client',
    })

    const details = await Client_Details.findOne({ where: { userId: form.userId } })

    const data = {
      username: form.client.username,
      email: form.client.email,
      age: details.age,
      gender: details.gender,
      whatsapp_number: details.whatsapp_number,
      weight: form.weight,
      height: form.height,
      habits: form.habits,
      current_health_complaints: form.current_health_complaints,
      current_medication: form.current_medication,
      health_fear: form.health_fear,
      family_history: form.family_history,
      allergies: form.allergies,
      desired_lifestyle: form.desired_lifestyle,
      preferred_drug_form: form.preferred_drug_form,
      usual_health_spending: form.usual_health_spending,
      proposed_monthly_budget: form.proposed_monthly_budget
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "successful",
      data: {
        data
      }
    })

  } catch (error) {
    res.status(500).json(error.messsage)
  }
}

const writeReport = async (req, res) => {
}

const endorseReport = async (req, res) => {
}

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'cloudinary_id'] },
      include: {
        model: Product_Detail, as: 'product_details',
        attributes: { exclude: ['productId', 'createdAt', 'updatedAt'] }
      }
    })

    return res.status(200).json({
      success: true,
      code: 200,
      message: "successful",
      data: {
        products
      }
    })

  } catch (err) {
    next(err)
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

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'Product has been added to the store successfully'
    })

  } catch (err) {
    // res.status(400).send(err.messsage)
    next(err)
  }
}


module.exports = { getForms, addProduct, getFormById, getAllProducts }