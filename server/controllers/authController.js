const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Create a JWT token string prefixed with "Bearer ".
 */
const createToken = (userId) => {
  const rawToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return `Bearer ${rawToken}`;
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already used" });
    }

    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};
