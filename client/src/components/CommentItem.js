import React from 'react';

import { timeAgo } from '../utils/timeAgo';

const CommentItem = ({ comment }) => {
  return (
    <li className="py-2 border-b border-gray-300 flex items-start space-x-4">
      <img
        src={comment.author?.profilePicture || 'https://via.placeholder.com/50'}
        alt={comment.author?.username}
        className="w-8 h-8 rounded-full"
      />
      <div>
        <p className="font-bold">{comment.author?.username || 'Anonymous'}</p>
        <p>{comment.content}</p>
        <p className="text-xs text-gray-500">{timeAgo(comment.createdAt)}</p>
      </div>
    </li>
  );
};

export default CommentItem;
