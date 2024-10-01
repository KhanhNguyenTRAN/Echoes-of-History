import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    era: '',
    description: '',
    birthDate: '',
    deathDate: '',
    notableWorks: '',
    imageUrl: '',
  });

  const goToCharacterManagement = () => {
    navigate('/admin/dashboard/character');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCharacter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCharacter = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newCharacter),
      });

      if (response.ok) {
        setNewCharacter({
          name: '',
          era: '',
          description: '',
          birthDate: '',
          deathDate: '',
          notableWorks: '',
          imageUrl: '',
        });
        setShowAddModal(false);
        alert('Character added successfully!');
      } else {
        alert('Failed to add character');
      }
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="flex justify-center space-x-6">
        <button
          onClick={goToCharacterManagement}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Manage Characters
        </button>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Character
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Character</h2>
            <form onSubmit={handleAddCharacter}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCharacter.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Era</label>
                <input
                  type="text"
                  name="era"
                  value={newCharacter.era}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newCharacter.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows="4"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Birth Date</label>
                <input
                  type="text"
                  name="birthDate"
                  value={newCharacter.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Death Date</label>
                <input
                  type="text"
                  name="deathDate"
                  value={newCharacter.deathDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Notable Works</label>
                <input
                  type="text"
                  name="notableWorks"
                  value={newCharacter.notableWorks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newCharacter.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add Character
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
