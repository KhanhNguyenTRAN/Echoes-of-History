import React, { useState } from 'react';

const CommentForm = ({ handleCommentSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommentSubmit(comment);
    setComment(''); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex justify-between items-center absolute bottom-0 left-0 right-0 p-4 bg-white shadow-inner"
    >
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        className="flex-grow px-4 py-2 border border-orange-300 rounded-l-lg focus:outline-none"
        required
      />
      <button type="submit" className="px-4 py-2 bg-orange-300 text-black rounded-r-lg border border-orange-300">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
