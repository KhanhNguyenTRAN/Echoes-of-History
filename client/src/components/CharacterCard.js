import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterCard = ({ id, name, imageUrl }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/character/${id}`);
  };

  return (
    <div
      className="relative w-[230px] h-[700px] flex-shrink-0 mx-4 overflow-hidden rounded-lg hover:shadow-2xl transition duration-300 cursor-pointer"
      onClick={handleCardClick} 
    >
      <img
        src={imageUrl}
        alt={name}
        className="object-cover w-full h-full"
      />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-70 h-24 flex justify-center items-center">
        <h3 className="text-3xl font-bold text-orange-300 text-center" style={{ fontFamily: 'Dancing Script' }}>{name}</h3>
      </div>
    </div>
  );
};

export default CharacterCard;
