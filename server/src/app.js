const cors = require('cors');
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbConfig');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

connectDB();
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000' 
  }));

const authRoutes = require('./routes/authRoutes');
const characterRoutes = require('./routes/characterRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/blogs', blogRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
