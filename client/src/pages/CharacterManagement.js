import React, { useEffect, useState } from 'react';

const CharacterManagement = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setCharacters((prevCharacters) =>
          prevCharacters.filter((character) => character._id !== id)
        );
      } else {
        console.error('Failed to delete character');
      }
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const handleUpdate = (character) => {
    setSelectedCharacter(character);
    setFormData(character);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/characters/${selectedCharacter._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedCharacter = await response.json();
        setCharacters((prevCharacters) =>
          prevCharacters.map((character) =>
            character._id === updatedCharacter._id ? updatedCharacter : character
          )
        );
        setShowModal(false);
      } else {
        console.error('Failed to update character');
      }
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Character Management</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-6 text-left border-r">Name</th>
              <th className="py-3 px-6 text-left border-r">Era</th>
              <th className="py-3 px-6 text-left border-r w-[40%]">Description</th>
              <th className="py-3 px-6 text-left border-r">Birth Date</th>
              <th className="py-3 px-6 text-left border-r">Death Date</th>
              <th className="py-3 px-6 text-left border-r">Notable Works</th>
              <th className="py-3 px-6 text-left border-r w-[20%]">Image URL</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {characters.length > 0 ? (
              characters.map((character) => (
                <tr key={character._id} className="border-b border-gray-300">
                  <td className="py-3 px-6 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap border-r">
                    {character.name}
                  </td>
                  <td className="py-3 px-6 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap border-r">
                    {character.era}
                  </td>
                  <td className="py-3 px-6 max-w-lg overflow-hidden text-ellipsis whitespace-normal line-clamp-3 border-r">
                    {character.description}
                  </td>
                  <td className="py-3 px-6 border-r">{character.birthDate}</td>
                  <td className="py-3 px-6 border-r">{character.deathDate}</td>
                  <td className="py-3 px-6 border-r">
                    {character.notableWorks ? character.notableWorks.join(', ') : 'N/A'}
                  </td>
                  <td className="py-3 px-6 max-w-sm overflow-hidden text-ellipsis whitespace-nowrap border-r">
                    {character.imageUrl}
                  </td>
                  <td className="py-3 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => handleUpdate(character)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(character._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No characters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Update Character</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Era</label>
                <input
                  type="text"
                  name="era"
                  value={formData.era || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Birth Date</label>
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Death Date</label>
                <input
                  type="text"
                  name="deathDate"
                  value={formData.deathDate || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Notable Works</label>
                <input
                  type="text"
                  name="notableWorks"
                  value={formData.notableWorks || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterManagement;
