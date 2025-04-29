import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/projects', {
        title,
        description,
        skills: skills.split(',').map(s => s.trim())
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      alert('Project created!');
      setTitle('');
      setDescription('');
      setSkills('');
    } catch (err) {
      alert(err.response?.data?.msg || 'Project creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Post a Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-3 p-2 border"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full mb-3 p-2 border"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 border"
          placeholder="Skills (comma-separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;

