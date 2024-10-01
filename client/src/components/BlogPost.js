import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import CommentList from './CommentList';
import CommentForm from './CommentForm';


import { timeAgo } from '../utils/timeAgo';

const BlogPost = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('userId from localStorage:', userId);
    console.log('post.likes:', post.likes);
    if (userId) {
      const likedByUser = post.likes.includes(userId);
      console.log('Is post liked by the user:', likedByUser);
      setIsLiked(likedByUser);
    }
  }, [post.likes]);
  
  const handleLike = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${post._id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedPost = await response.json();
  
      console.log('Updated post.likes:', updatedPost.likes);
      
      setLikeCount(updatedPost.likes.length);
      setIsLiked(updatedPost.likes.includes(userId));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  

  const handleCommentSubmit = async (commentText) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${post._id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: commentText }),
      });
      const newComment = await response.json();
      setComments([newComment, ...comments]); 
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  return (
    <>
      <div className="py-6 border-b border-gray-400 mb-6 w-1/2 mx-auto">
        <div className="flex items-center mb-2">
          <div className="mr-3">
            <img
              src={post.author.profilePicture || 'https://via.placeholder.com/50'}
              alt={post.author.username}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{post.author.username}</h3>
            <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
        <p className="text-gray-400 mb-4">{post.content}</p>

        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handleLike}
            className="flex items-center text-gray-400 hover:text-red-500 transition-colors"
          >
            <FontAwesomeIcon icon={faHeart} className={`mr-2 ${isLiked ? 'text-red-500' : ''}`} />
            <span>{likeCount}</span>
          </button>

          <button className="flex items-center text-gray-400" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faComment} className="mr-2" />
            {comments.length} Comments
          </button>
        </div>
      </div>

      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="py-6 border-b border-gray-300 mb-6 w-full">
            <div className="flex items-center mb-2">
              <div className="mr-3">
                <img
                  src={post.author.profilePicture || 'https://via.placeholder.com/50'}
                  alt={post.author.username}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">{post.author.username}</h3>
                <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-black mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>

            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={handleLike}
                className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
              >
                <FontAwesomeIcon icon={faHeart} className={`mr-2 ${isLiked ? 'text-red-500' : ''}`} />
                <span>{likeCount}</span>
              </button>

              <button className="flex items-center text-gray-600">
                <FontAwesomeIcon icon={faComment} className="mr-2" />
                {comments.length} Comments
              </button>
            </div>
          </div>

          <div className="relative max-h-[50%] overflow-auto">
            <div className="sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold mb-2">Comments</h3>
            </div>
            <CommentList comments={comments} />
          </div>

          <CommentForm handleCommentSubmit={handleCommentSubmit} />
        </Modal>
      )}
    </>
  );
};

export default BlogPost;
