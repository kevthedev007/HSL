const express = require('express')
const router = express.Router();
const { getBlogs, postBlog, getOneBlog } = require('../controllers/blogController');
const { verifyToken, admin_role } = require('../utils/verify')

router.get('/', verifyToken, getBlogs);
router.post('/add-blog', [verifyToken, admin_role], postBlog);
router.get('/get-blog/:id', verifyToken, getOneBlog);

module.exports = router;