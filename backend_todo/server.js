const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const todoRoutes = require('./routes/todoRoutes');

// Initialize Express
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json()); // For parsing application/json

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use routes
app.use('/api', todoRoutes);

// Start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
