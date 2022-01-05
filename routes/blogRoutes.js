const express = require('express')
const router = express.Router();
const { getBlogs, postBlog, getOneBlog, deleteBlog } = require('../controllers/blogController');
const { verifyToken, admin_role } = require('../utils/verify')

router.get('/', verifyToken, getBlogs);
router.post('/add-blog', [verifyToken, admin_role], postBlog);
router.get('/get-blog/:id', verifyToken, getOneBlog);
router.delete('/delete-blog', [verifyToken, admin_role], deleteBlog);

module.exports = router;