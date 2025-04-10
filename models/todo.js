const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'active'],
    default: 'pending'
  },
}, { timestamps: true }); 

module.exports = mongoose.model('Todo', todoSchema);