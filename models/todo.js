const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'active'],
        default: 'pending'
    },
})

module.exports = mongoose.model('Todo', todoSchema);
