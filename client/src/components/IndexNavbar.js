import React from 'react';
import { Link } from 'react-router-dom';
import logo_navbar from '../assets/logo_navbar.png';

function IndexNavbar() {
  return (
    <nav className="bg-black bg-opacity-30 w-full px-8 py-4 flex justify-between items-center backdrop-blur-sm">
      <div className="flex items-center text-2xl font-bold text-white">
        <img 
          src={logo_navbar}
          alt="Echoes Of History Logo" 
          className="h-12 w-auto mr-2 object-contain"
          style={{ maxHeight: '50px' }}
        />
        <Link to="/" className="hover:text-gray-300">Echoes Of History</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="flex justify-center items-center min-w-[120px] px-4 py-2 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors duration-200">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="flex justify-center items-center min-w-[120px] px-4 py-2 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors duration-200">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default IndexNavbar;
