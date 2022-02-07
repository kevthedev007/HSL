const { Health_Testimonial } = require('../models/index');
const createError = require('http-errors');

const postTestimonial = async (req, res, next) => {
  try {
    const description = req.body.description;

    const testimonial = await Health_Testimonial.create({
      userId: req.user.id,
      description
    })

    res.status(200).json({ message: 'Testimonial added successfully' })
  } catch (error) {
    next(error)
  }
}

const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Health_Testimonial.findAll({
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json({ testimonials })
  } catch (error) {
    next(error)
  }
}

module.exports = { postTestimonial, getTestimonials }