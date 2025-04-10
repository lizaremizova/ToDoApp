require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
// const db = mongoose.connection;
// db.on('error', (error) => console.error('MongoDB connection error:', error));
// db.once('open', () => console.log('Server connected to MongoDB'));

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, 
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
  


app.use(express.json());
app.use(express.static('public'));

const todoRouter = require('./routes/todos');
app.use('/todos', todoRouter);

app.listen(3000, () => console.log('Server started on port 3000'));


