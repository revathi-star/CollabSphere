import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProjectFeed from './pages/ProjectFeed';
import CreateProject from './pages/CreateProject';
import Navbar from './components/Navbar';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <ProjectFeed /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={isAuthenticated ? <CreateProject /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;









