const express = require('express')
const router = express.Router();
const { getBlogs, postBlog, getOneBlog, deleteBlog } = require('../controllers/blog.controller');
const { verifyToken, admin_role } = require('../utils/verify')

router.get('/', verifyToken, getBlogs);
router.post('/add-blog', [verifyToken, admin_role], postBlog);
router.get('/get-blog/:id', verifyToken, getOneBlog);
router.delete('/delete-blog/:id', [verifyToken, admin_role], deleteBlog);

module.exports = router;