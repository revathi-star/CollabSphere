import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateProject from './pages/CreateProject';
import ProjectFeed from './pages/ProjectFeed';
import Navbar from './components/NavBar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/projects" element={isAuthenticated ? <ProjectFeed /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated ? <CreateProject /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;








