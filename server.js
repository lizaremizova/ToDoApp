require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Server connected to MongoDB'));

app.use(express.json());

const todoRouter = require('./routes/todos');
app.use('/todos', todoRouter);

app.listen(3000, () => console.log('Server started on port 3000'));