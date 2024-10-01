import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomeNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-black bg-opacity-20 w-full px-8 py-4 flex justify-between items-center backdrop-blur-sm">
      <div className="flex items-center text-5xl font-bold text-orange-300">
        <Link to="/home" className="hover:text-orange-400 " style={{ fontFamily: 'Dancing Script' }}>Echoes Of History</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/home">
          <button className="flex justify-center items-center min-w-[120px] px-4 py-2 border-2 border-orange-300 text-orange-300 font-semibold rounded-full hover:bg-orange-300 hover:text-black transition-colors duration-200">
            Home
          </button>
        </Link>
        <Link to="/character">
          <button className="flex justify-center items-center min-w-[120px] px-4 py-2 border-2 border-orange-300 text-orange-300 font-semibold rounded-full hover:bg-orange-300 hover:text-black transition-colors duration-200">
            Characters
          </button>
        </Link>
        <Link to="/blog">
          <button className="flex justify-center items-center min-w-[120px] px-4 py-2 border-2  border-orange-300 text-orange-300 font-semibold rounded-full hover:bg-orange-300 hover:text-black transition-colors duration-200">
            Forum
          </button>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex justify-center items-center min-w-[120px] px-4 py-2 border-2 border-orange-300 text-orange-300 font-semibold rounded-full hover:bg-orange-300 hover:text-black transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default HomeNavbar;
