const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

// Routes
router.post('/todos', createTodo); // Create a new todo
router.get('/todos', getTodos); // Get all todos
router.put('/todos/:id', updateTodo); // Update a todo by ID

router.delete('/todos/:id', deleteTodo); // Delete a todo by ID

module.exports = router;
