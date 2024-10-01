import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ characters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Filter characters based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCharacters([]);
    } else {
      const filtered = characters
        .filter((character) =>
          character.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 3);
      setFilteredCharacters(filtered);
    }
  }, [searchQuery, characters]);

  // Handle user selecting a character
  const handleCharacterSelect = (characterId) => {
    navigate(`/character/${characterId}`); 
  };

  // Handle click outside of search input to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredCharacters([]); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="absolute top-20 right-10 w-full max-w-xs z-20 mt-5"
      ref={searchRef}
    >
      <input
        type="text"
        className="w-full text-white bg-transparent border border-orange-300 px-4 py-2 rounded-lg pr-10"
        placeholder="Search for a character..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300" />

      {filteredCharacters.length > 0 && (
        <ul className="absolute text-white bg-black bg-opacity-70 border border-orange-300 rounded-lg w-full mt-1 max-h-48 overflow-auto z-30">
          {filteredCharacters.map((character) => (
            <li
              key={character._id}
              className="p-2 cursor-pointer hover:bg-gray-100 hover:text-black"
              onClick={() => handleCharacterSelect(character._id)}
            >
              {character.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
