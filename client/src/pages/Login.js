import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/projects');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <input className="w-full mb-3 p-2 border" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input className="w-full mb-3 p-2 border" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button className="w-full bg-green-500 text-white py-2 rounded">Login</button>
    </form>
  );
};

export default Login;



