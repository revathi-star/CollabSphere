import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ token, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4 font-bold text-lg">CollabSphere</Link>
        {token && (
          <Link to="/create" className="mr-4 hover:underline">Create Project</Link>
        )}
      </div>
      <div>
        {token ? (
          <button onClick={onLogout} className="hover:underline">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


