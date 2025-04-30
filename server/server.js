const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
exports.app = app;

// Middleware
app.use(cors({
  origin: 'https://collab-sphere-nu.vercel.app',
  credentials: true
}));
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.send('Server is healthy');
});

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/Project.js'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



