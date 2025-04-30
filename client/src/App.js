import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProjectFeed from './pages/ProjectFeed';
import CreateProject from './pages/CreateProject';
import Navbar from './components/NavBar';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ProjectFeed" element={<ProjectFeed />} />
      </Routes>
    </Router>
  );
}

export default App;










