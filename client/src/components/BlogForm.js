import React from 'react';

const BlogForm = ({ newPost, handleInputChange, handleFormSubmit, submitting }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 bg-transparent bg-opacity-90 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-300">Create a New Post</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={newPost.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-white"
          required
        />
        <textarea
          name="content"
          placeholder="Post content"
          value={newPost.content}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-white"
          rows="6"
          style={{ resize: 'none' }}
          required
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
