import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import ChatBox from '../components/ChatBox'; 
import HomeNavbar from '../components/HomeNavbar'; 
import backgroundImage from '../assets/character_background.png'; 

const CharacterDetailPage = () => {
  const { id } = useParams(); 
  const [character, setCharacter] = useState(null);
  const [activeSection, setActiveSection] = useState('information');

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/characters/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleToggle = (section) => {
    setActiveSection(section);
  };

  if (!character) {
    return <div className="text-center text-xl mt-20">Loading...</div>;
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-10">
        <HomeNavbar />
      </div>

      <div
        className="h-screen bg-cover bg-center flex flex-col overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0,0,0,0.6)', 
        }}
      >
        <div className="flex justify-center mt-28 space-x-4 z-20">
          <button
            onClick={() => handleToggle('information')}
            className={`px-4 py-2 font-bold border-b-4 transition-colors ${
              activeSection === 'information' ? 'border-orange-300 text-orange-300' : 'border-transparent text-gray-500'
            }`}
          >
            Information
          </button>
          <button
            onClick={() => handleToggle('conversation')}
            className={`px-4 py-2 font-bold border-b-4 transition-colors ${
              activeSection === 'conversation' ? 'border-orange-300 text-orange-300' : 'border-transparent text-gray-500'
            }`}
          >
            Conversation
          </button>
        </div>

        <div className="flex-grow flex items-center justify-center p-8">
          <div className="flex w-[70%] h-[80%] bg-black bg-opacity-40 shadow-xl rounded-lg transition-all duration-500">
            
            <div className="flex w-full">
              <div className="w-1/2 flex items-center justify-center pr-4">
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="w-full h-[650px] object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="w-1/2 pl-4 flex flex-col">
                {activeSection === 'information' && (
                  <div className="p-6 text-orange-300">
                    <h1 className="text-3xl font-extrabold mb-4">{character.name}</h1>
                    <div className="text-md leading-relaxed">
                      <p className="mb-2"><strong>Description:</strong> {character.description}</p>
                      <p className="mb-2"><strong>Birth Date:</strong> {character.birthDate}</p>
                      <p className="mb-2"><strong>Death Date:</strong> {character.deathDate}</p>
                      <p className="mb-2"><strong>Notable Works:</strong> {character.notableWorks}</p>
                      <p className="mb-2"><strong>Era:</strong> {character.era}</p>
                    </div>
                  </div>
                )}
                
                {activeSection === 'conversation' && (
                  <div className="p-6 bg-transparent rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center text-orange-300">Ask me anything</h2>
                    <ChatBox characterId={id} characterName={character.name} />
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterDetailPage;
