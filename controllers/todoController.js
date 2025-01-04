const Todo = require("../models/todo");

// create  todos
const createTodo = async (req, res) => {
    try {
        const { task } = req.body;
        const newTodo = new Todo({
            task,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: 'Error creating todo', error: err });
    }
};

// get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching todos', error: err });
    }
};

// Update a todo by ID
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(id, { task, completed }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: 'Error updating todo', error: err });
    }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting todo', error: err });
    }
};


module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
