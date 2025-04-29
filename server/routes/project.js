const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createProject,
  getProjects,
  markInterest,
  addDiscussion
} = require('../controllers/projectController');

// Routes
router.post('/', auth, createProject);               // Create project
router.get('/', getProjects);                        // Get all projects
router.post('/:id/interested', auth, markInterest);  // Mark interest in a project
router.post('/:id/discuss', auth, addDiscussion);    // Add a comment/discussion

module.exports = router;


