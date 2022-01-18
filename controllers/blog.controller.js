const { User, Blog } = require('../models/index');
const sequelize = require('sequelize');

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json({ blogs })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const postBlog = async (req, res) => {
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
    return res.status(400).json({ error: error.message })
  }
}

const getOneBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findOne({
      where: { id },
      attributes: { exclude: ['userId', 'updatedAt'] }
    });

    if (!blog) return res.status(400).json({ message: "blog not found" })

    return res.status(200).json({ blog })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await Blog.destroy({ where: { id } });
    return res.status(200).json({ message: "Blog has been successfully deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getBlogs, postBlog, getOneBlog, deleteBlog }