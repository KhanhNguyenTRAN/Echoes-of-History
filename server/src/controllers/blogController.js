const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find()
            .populate('author', 'username profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author', 
                    select: 'username profilePicture' 
                }
            });
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createBlogPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const blogPost = new BlogPost({
            title,
            content,
            author: req.user._id,
        });

        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const likeBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const userId = req.user._id;

        if (blogPost.likes.includes(userId)) {
            blogPost.likes = blogPost.likes.filter(id => id.toString() !== userId.toString());
        } else {
            blogPost.likes.push(userId);
        }

        await blogPost.save();

        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const commentOnBlogPost = async (req, res) => {
    const { content } = req.body;
  
    try {
      const blogPost = await BlogPost.findById(req.params.id);
  
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      const comment = new Comment({
        content,
        author: req.user._id, 
        post: blogPost._id,
      });
  
      await comment.save();
  
      const populatedComment = await Comment.findById(comment._id).populate('author', 'username profilePicture');
  
      blogPost.comments.push(comment._id);
      await blogPost.save();
  
      res.status(201).json(populatedComment);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };  


module.exports = {
    getBlogPosts,
    createBlogPost,
    likeBlogPost,
    commentOnBlogPost,
};
