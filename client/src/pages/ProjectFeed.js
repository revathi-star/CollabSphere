import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectFeed = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (err) {
      alert('Failed to load projects');
    }
  };

  const handleInterest = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/projects/${id}/interested`, {}, {
        headers: { Authorization: token }
      });
      alert('Interest marked!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error marking interest');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Projects</h2>
      {projects.map(project => (
        <div key={project._id} className="mb-4 p-4 border rounded shadow">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p>{project.description}</p>
          <p className="text-sm text-gray-600">Skills: {project.skills.join(', ')}</p>
          <button
            onClick={() => handleInterest(project._id)}
            className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded"
          >
            I'm Interested
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectFeed;




