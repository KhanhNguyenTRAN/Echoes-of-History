const express = require('express');
const {
    getBlogPosts,
    createBlogPost,
    likeBlogPost,
    commentOnBlogPost,
} = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get all blog posts
router.get('/', getBlogPosts);

// Route to create a new blog post (protected)
router.post('/', protect, createBlogPost);

// Route to like/unlike a blog post (protected)
router.put('/:id/like', protect, likeBlogPost);

// Route to comment on a blog post (protected)
router.post('/:id/comment', protect, commentOnBlogPost);

module.exports = router;
