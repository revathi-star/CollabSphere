const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Simple middleware to ensure email and password are present
const validateAuthBody = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ msg: 'Email and password must be strings' });
  }
  
  // Check for empty fields
  if (!email.trim() || !password.trim()) {
    return res.status(400).json({ msg: 'Email and password cannot be empty' });
  }

  // Email format validation (Basic regex for valid email format)
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  // Password length check (Minimum 6 characters, you can modify as needed)
  if (password.length < 6) {
    return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
  }

  next();
};

router.post('/signup', validateAuthBody, signup);
router.post('/login', validateAuthBody, login);

module.exports = router;


