const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Simple middleware to ensure email and password are present
const validateAuthBody = (req, res, next) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ msg: 'Email and password must be strings' });
  }
  if (!email.trim() || !password.trim()) {
    return res.status(400).json({ msg: 'Email and password cannot be empty' });
  }
  next();
};

router.post('/signup', validateAuthBody, signup);
router.post('/login', validateAuthBody, login);

module.exports = router;

