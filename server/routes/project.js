// Middleware to validate the body for creating a project
const validateProjectBody = (req, res, next) => {
  const { title, description, skills } = req.body;
  if (!title || !description || !skills) {
    return res.status(400).json({ msg: "Title, description, and skills are required" });
  }
  next();
};

// Middleware to validate the body for adding a discussion
const validateDiscussionBody = (req, res, next) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ msg: "Message is required for the discussion" });
  }
  next();
};

// Routes with validation middleware
router.post('/', auth, validateProjectBody, createProject); // Create project
router.get('/', getProjects);                             // Get all projects
router.post('/:id/interested', auth, markInterest);       // Mark interest in a project
router.post('/:id/discuss', auth, validateDiscussionBody, addDiscussion); // Add a comment/discussion



