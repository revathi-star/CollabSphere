import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to post a project');
      return;
    }

    try {
      await axios.post('https://collabsphere-backend-m2xv.onrender.com/api/projects', {
        title,
        description,
        skills: skills.split(',').map(s => s.trim())
      }, {
        headers: {
          Authorization: token
        }
      });

      alert('Project created successfully!');
      setTitle('');
      setDescription('');
      setSkills('');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Project creation failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Post a New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-3 p-2 border"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full mb-3 p-2 border"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 border"
          placeholder="Required Skills (comma-separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProject;


