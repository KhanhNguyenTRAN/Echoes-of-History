import React from 'react';
import IndexNavbar from '../components/IndexNavbar';
import backgroundImage from '../assets/index.png'; 

function IndexPage() {
  return (
    <div 
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-0 left-0 w-full">
        <IndexNavbar />
      </div>
    </div>
  );
}

export default IndexPage;
