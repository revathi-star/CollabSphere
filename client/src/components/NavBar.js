import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="text-xl font-bold">CollabSphere</div>
      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/projects">Feed</Link>
            <Link to="/create">New Project</Link>
            <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
