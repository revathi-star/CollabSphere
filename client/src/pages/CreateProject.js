import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://collabsphere-backend-m2xv.onrender.com/api/projects';

const CreateProject = ({ token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Project created successfully!');
      setForm({ title: '', description: '', techStack: '' });
    } catch (err) {
      console.error(err);
      setMessage('Failed to create project. Please login.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma-separated)"
          value={form.techStack}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;



