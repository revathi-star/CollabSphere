import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProjectFeed from './components/ProjectFeed';
import CreateProject from './components/CreateProject';
import Navbar from './components/Navbar';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken('');
  };

  return (
    <Router>
      <Navbar token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={token ? <ProjectFeed token={token} /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/create" element={token ? <CreateProject token={token} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;










