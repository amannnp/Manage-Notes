const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

const authRouter = require('./routes/Auth');

app.use('/api/auth', authRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
