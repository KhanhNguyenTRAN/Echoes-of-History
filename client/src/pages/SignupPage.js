import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/login_background.png'; 

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [job, setJob] = useState(''); 
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, fullName, dateOfBirth, job }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup Successful:', data);
        navigate('/login');
      } else {
        throw new Error(data.message || 'An error occurred during signup');
      }
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-[#4A403A] bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-5xl font-extrabold text-[#D4B483] mb-6 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Join Us in History
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="custom-placeholder mb-4 px-4 py-2 w-full border border-[#D4B483] rounded text-[#D4B483] bg-[#4A403A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="custom-placeholder mb-4 px-4 py-2 w-full border border-[#D4B483] rounded text-[#D4B483] bg-[#4A403A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="custom-placeholder mb-4 px-4 py-2 w-full border border-[#D4B483] rounded text-[#D4B483] bg-[#4A403A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
            className="custom-placeholder mb-4 px-4 py-2 w-full border border-[#D4B483] rounded text-[#D4B483] bg-[#4A403A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className="custom-placeholder mb-4 px-4 py-2 w-full border border-[#D4B483] rounded text-[#D4B483] bg-[#4A403A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          />
          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
            className="custom-placeholder mb-6 px-4 py-2 w-full border border-[#D4B483] rounded text-[#D4B483] bg-[#4A403A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          >
            <option value="" disabled>Select your current job</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Historian">Historian</option>
            <option value="Researcher">Researcher</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            className="text-3xl w-full bg-[#D4B483] hover:bg-[#B89C6E] text-[#4A403A] font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#D4B483] transition"
            style={{ fontFamily: 'Dancing Script' }}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
