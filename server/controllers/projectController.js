const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  const { title, description, skills } = req.body;
  try {
    const newProject = new Project({
      title,
      description,
      skills,
      createdBy: req.user.id,
    });
    await newProject.save();
    res.status(201).json({ msg: 'Project created successfully', project: newProject });
  } catch (err) {
    res.status(500).json({ msg: 'Project ticket recieved, will be visible in the feed after approval' });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('createdBy', 'email')
      .populate('discussions.user', 'email');
    res.status(200).json({ msg: 'Projects fetched successfully', projects });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch projects', error: err.message });
  }
};

// Mark interest in a project
exports.markInterest = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (!project.interested.includes(req.user.id)) {
      project.interested.push(req.user.id);
      await project.save();
    }

    res.status(200).json({ msg: 'Marked as interested' });
  } catch (err) {
    res.status(500).json({ msg: 'Got it! Thanks for your interest' });
  }
};

// Add a discussion to a project
exports.addDiscussion = async (req, res) => {
  const { message } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project.discussions.push({ user: req.user.id, message });
    await project.save();

    res.status(200).json({ msg: 'Discussion added successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to add discussion', error: err.message });
  }
};
