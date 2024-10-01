import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/login_background.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data._id);  
        navigate('/home'); 
      } else {
        throw new Error(data.message || 'An error occurred during login');
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };
  
  


  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-[#4A403A] bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-5xl font-extrabold text-[#D4B483] mb-6 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Welcome To History
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="mb-4 px-4 py-2 w-full border border-[#D4B483] rounded text-[#D4B483] bg-[#4A403A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mb-6 px-4 py-2 w-full border border-[#D4B483] rounded text-[#D4B483] bg-[#4A403A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          />
          <button
            type="submit"
            className=" text-3xl w-full bg-[#D4B483] hover:bg-[#B89C6E] text-[#4A403A] font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#D4B483] transition" style={{ fontFamily: 'Dancing Script' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
