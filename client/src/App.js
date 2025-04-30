import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProjectFeed from './pages/ProjectFeed';
import CreateProject from './pages/CreateProject';
import Navbar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { AuthProvider, useAuth } from './context/AuthContext';


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

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const { token } = useContext(AuthContext);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/feed" />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/feed" />} />
        <Route path="/feed" element={token ? <ProjectFeed /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;










