import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/projects');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Sign Up</h2>
      <input className="w-full mb-3 p-2 border" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input className="w-full mb-3 p-2 border" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button className="w-full bg-blue-500 text-white py-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;



