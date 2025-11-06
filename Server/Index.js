const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ Database connected successfully');
})
.catch((error) => {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
});

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Weather Server is running', database: 'connected' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
