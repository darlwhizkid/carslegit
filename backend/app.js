const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();

// CORS configuration before any routes
app.use(cors({
    origin: 'https://carslegit.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working' });
});

module.exports = app;