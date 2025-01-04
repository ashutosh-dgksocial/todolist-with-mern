const mongoose = require('mongoose');

// Todo Schema
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt fields
});

// Create a Todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
