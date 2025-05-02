const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password should be at least 6 characters'],
    validate: {
      validator: (v) => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/.test(v),
      message: 'Password must contain at least one uppercase letter, one number, and one special character.'
    }
  },
});

// Encrypt password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);  // Increased salt rounds for better security
  next();
});

// Add method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);


