import React, { useEffect, useState } from 'react';
import CharacterCarousel from '../components/CharacterCarousel'; 
import HomeNavbar from '../components/HomeNavbar';
import SearchBar from '../components/SearchBar'; 
import backgroundImage from '../assets/character_background.png'; 

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);

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

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0,0,0,0.6)',
      }}
    >
      <HomeNavbar />
      <SearchBar characters={characters} /> 
      <div className="container mx-auto py-8 mt-12">
        <CharacterCarousel characters={characters} />
      </div>
    </div>
  );
};

export default CharacterPage;
