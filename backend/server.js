require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
// Initialize express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend server is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Add this line after your existing requires
const authRoutes = require('./routes/auth');

// Add this line after your middleware
app.use('/api/auth', authRoutes);



const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);
