import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectFeed = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://collabsphere-backend-m2xv.onrender.com/api/projects');
        setProjects(res.data);
      } catch (err) {
        alert('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  const handleInterest = async (projectId) => {
    try {
      await axios.post(`https://collabsphere-backend-m2xv.onrender.com/api/projects/${projectId}/interested`, {}, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      alert('Interest marked!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to mark interest');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Feed</h1>
      {projects.map((proj) => (
        <div key={proj._id} className="mb-4 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">{proj.title}</h2>
          <p>{proj.description}</p>
          <p className="text-sm text-gray-600">Skills: {proj.skills?.join(', ')}</p>
          <button
            onClick={() => handleInterest(proj._id)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            I'm Interested
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectFeed;






