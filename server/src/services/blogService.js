const BlogPost = require('../models/BlogPost');

// Service function to find a blog post by ID
const findBlogPostById = async (id) => {
    return await BlogPost.findById(id).populate('author', 'username').populate('comments');
};

module.exports = {
    findBlogPostById,
};
