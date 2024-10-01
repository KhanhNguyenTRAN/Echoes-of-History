import React, { useEffect, useState } from 'react';
import BlogForm from '../components/BlogForm';
import BlogPostList from '../components/BlogPostList';
import HomeNavbar from '../components/HomeNavbar';
import BackgroundImage from '../assets/character_background.png';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        const data = await response.json();

        if (Array.isArray(data)) {
          setBlogPosts(data);
        } else {
          throw new Error("Unexpected data format. Expected an array.");
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const createdPost = await response.json();
      setBlogPosts((prevPosts) => [createdPost, ...prevPosts]); 
      setNewPost({ title: '', content: '' });
      setSubmitting(false);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center text-xl mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-10">
        <HomeNavbar />
      </div>

      <div
        className="relative h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      >
        <div className="container mx-auto py-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>

          <BlogForm
            newPost={newPost}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            submitting={submitting}
          />

          <BlogPostList blogPosts={blogPosts} />
        </div>
      </div>
    </>
  );
};

export default BlogPage;
