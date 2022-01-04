const express = require('express')
const router = express.Router();
const { getBlogs, postBlog, getOneBlog } = require('../controllers/blogController');

router.get('/', getBlogs);
router.post('/add-blog', postBlog);
router.get('/get-blog/:id', getOneBlog);

module.exports = router;