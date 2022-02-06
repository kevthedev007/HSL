const { User, Blog } = require('../models/index');
const sequelize = require('sequelize');
const createError = require('http-errors');

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json({ blogs })
  } catch (error) {
    next(error)
  }
}

const postBlog = async (req, res, next) => {
  const { title, category, description } = req.body

  try {
    const blog = await Blog.create({
      userId: req.user.id,
      title,
      category,
      description
    })

    return res.status(201).json({ message: "Blog added successfully" })
  } catch (error) {
    next(error)
  }
}

const getOneBlog = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findOne({
      where: { id },
      attributes: { exclude: ['userId', 'updatedAt'] }
    });

    if (!blog) throw createError.NotFound("blog not found")

    return res.status(200).json({ blog })

  } catch (error) {
    next(error)
  }
}

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.destroy({ where: { id } });
    return res.status(200).json({ message: "Blog has been successfully deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = { getBlogs, postBlog, getOneBlog, deleteBlog }