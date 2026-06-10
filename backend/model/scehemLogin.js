const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },

  password: { 
    type: String, 
    required: true 
  },

  role: { 
    type: String, 
    default: 'mainAdmin' 
  },

  phone: { 
    type: Number, 
    required: true 
  },
  hiredDate: { 
    type: Date, 
    default: Date.now 
  }

}, { timestamps: true }); // adds createdAt & updatedAt

const User = mongoose.model('User', userSchema);

module.exports = User;