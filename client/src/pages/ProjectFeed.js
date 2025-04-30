// src/pages/ProjectFeed.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://collabsphere-backend-m2xv.onrender.com/api/projects';

const ProjectFeed = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(API_URL);
        setProjects(res.data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const handleInterest = async (projectId) => {
    try {
      await axios.post(
        `${API_URL}/${projectId}/interested`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Interest marked successfully');
    } catch (err) {
      alert('Failed to mark interest. Please make sure you are logged in.');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Project Feed</h2>
      {error && <p className="text-red-600">{error}</p>}
      {projects.length === 0 && <p>No projects to show</p>}
      {projects.map((project) => (
        <div key={project._id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p>{project.description}</p>
          {token && (
            <button
              onClick={() => handleInterest(project._id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              I'm Interested
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectFeed;









