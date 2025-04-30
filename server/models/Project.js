const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  skills: [String],  // or rename to techStack if preferred
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  discussions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });  // Adds createdAt and updatedAt on each doc

module.exports = mongoose.model('Project', projectSchema);

