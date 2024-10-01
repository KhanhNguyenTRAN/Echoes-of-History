import React, { useEffect, useState, useRef } from 'react';
import CharacterCard from './CharacterCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

const CharacterCarousel = () => {
  const [characters, setCharacters] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/characters');
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <button
        className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 text-white hover:scale-125 transition-transform duration-300"
        onClick={scrollLeft}
        style={{ outline: 'none', background: 'none', border: 'none' }}
      >
        <FaChevronLeft size={30} />
      </button>

      <div
        className="flex cursor-grab transition-transform duration-500 overflow-x-auto no-scrollbar"
        ref={carouselRef}
        style={{
          userSelect: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {characters.map((character) => (
          <CharacterCard
            key={character._id}
            id={character._id} 
            imageUrl={character.imageUrl}
            name={character.name}
          />
        ))}
      </div>

      <button
        className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 text-white hover:scale-125 transition-transform duration-300"
        onClick={scrollRight}
        style={{ outline: 'none', background: 'none', border: 'none' }} 
      >
        <FaChevronRight size={30} />
      </button>
    </div>
  );
};

export default CharacterCarousel;
