import React from 'react';
import BlogPost from './BlogPost';

const BlogPostList = ({ blogPosts }) => {
  return (
    <div className="space-y-8 bg-transparent bg-opacity-90 p-6 rounded-lg shadow-md overflow-auto h-2/3 scrollbar-hide">
      {blogPosts.length === 0 ? (
        <p className="text-center text-lg">No blog posts available.</p>
      ) : (
        blogPosts.map((post) => <BlogPost key={post._id} post={post} />)
      )}
    </div>
  );
};

export default BlogPostList;
