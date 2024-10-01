import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {comments
        .slice()
        .reverse() 
        .map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
    </ul>
  );
};

export default CommentList;
