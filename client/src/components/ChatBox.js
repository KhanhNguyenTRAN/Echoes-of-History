import React, { useState } from 'react';

const ChatBox = ({ characterId, characterName }) => {
  const [message, setMessage] = useState(''); 
  const [chatHistory, setChatHistory] = useState([]); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    const token = localStorage.getItem('token');
    console.log('Token:', token); 

    try {
      setLoading(true); 

      const response = await fetch(`http://localhost:5000/api/characters/${characterId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Error interacting with character');
      }

      const data = await response.json();
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'user', content: message },
        { role: 'bot', content: data.response },
      ]);
      setMessage('');
    } catch (error) {
      console.error('Error interacting with character:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <div className="border border-orange-300 p-4 rounded-lg mb-4 h-64 overflow-y-auto bg-transparent">
        {chatHistory.length === 0 && <p className="text-white">Start a conversation with {characterName}...</p>}
        {chatHistory.map((chat, index) => (
          <div key={index} className={`mb-2 ${chat.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-4 py-2 rounded-lg ${chat.role === 'user' ? 'bg-orange-300 text-black' : 'bg-zinc-900 text-orange-300'}`}>
              {chat.content}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question..."
          className="text-white flex-grow px-4 py-2 border border-orange-300 rounded-l-lg focus:outline-none bg-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-orange-300 text-black px-4 py-2 rounded-r-lg disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
