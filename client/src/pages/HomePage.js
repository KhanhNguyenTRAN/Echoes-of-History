import React, { useEffect, useState } from 'react';
import HomeNavbar from '../components/HomeNavbar';
import CharacterCard from '../components/CharacterCard'; 
import { FaArrowRight } from 'react-icons/fa'; 
import BackgroundImage from '../assets/character_background.png';

function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [featuredCharacters, setFeaturedCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/characters'); 
        const data = await response.json();

        if (Array.isArray(data)) {
          setCharacters(data);

          const randomCharacters = data.sort(() => 0.5 - Math.random()).slice(0, 3);
          setFeaturedCharacters(randomCharacters);
        }
      } catch (err) {
        console.error('Error fetching characters:', err);
      }
    };

    fetchCharacters();
  }, []);

  const navigateToCharactersPage = () => {
    window.location.href = '/character'; 
  };

  const navigateToBlogPage = () => {
    window.location.href = '/blog'; 
  };

  return (
    <div>
      <div className="absolute top-0 left-0 w-full z-10">
        <HomeNavbar />
      </div>

      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      >
        <div className="container mx-auto py-8 flex flex-col space-y-16">
          <div className="flex items-center justify-between mt-20">
            <div className="w-1/2 flex justify-start space-x-4">
              {featuredCharacters.map((character) => (
                <CharacterCard
                  key={character._id}
                  id={character._id}
                  name={character.name}
                  imageUrl={character.imageUrl}
                />
              ))}
            </div>

            <div className="w-1/2 flex flex-col justify-center text-white pl-12">
              <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg">
                <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Dancing Script' }}>Talk with Famous Characters</h2>
                <p className="text-3xl mb-8" style={{ fontFamily: 'Dancing Script' }}>
                  Welcome to Echoes of History! Discover the stories and legacies of famous historical figures. Engage in conversations with characters from different eras and learn more about their lives, works, and the impact they left behind.
                </p>
                <div className="flex justify-center">
                <button
                  className="flex items-center text-white px-6 py-3 rounded-lg border border-white bg-transparent hover:scale-110 transition-transform duration-300 ease-in-out"
                  onClick={navigateToCharactersPage}
                >
                  <span className="mr-2 text-3xl" style={{ fontFamily: 'Dancing Script' }}>Explore More</span>
                  <FaArrowRight />
                </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col text-white">
            <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
              <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Dancing Script' }}>Join the Conversation</h2>
              <p className="text-3xl mb-8" style={{ fontFamily: 'Dancing Script' }}>
                Our blog is a space for history enthusiasts to share insights, ask questions, and discuss the events and characters that shaped our world. Dive into debates, explore new perspectives, and connect with others who share your passion for history.
              </p>
              <div className="flex justify-center">
                <button
                  className="flex items-center justify-center text-white px-6 py-3 rounded-lg border border-white bg-transparent hover:scale-110 transition-transform duration-300 ease-in-out"
                  onClick={navigateToBlogPage}
                >
                  <span className="mr-2 text-3xl" style={{ fontFamily: 'Dancing Script' }}>Visit Our Forum</span>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
