const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  skills: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  discussions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Project', projectSchema);
