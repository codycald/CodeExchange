var mongoose = require('mongoose');

var Author = new mongoose.Schema({
    username: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Comment = new mongoose.Schema({
    text: String,
    author: Author
});

var Answer =  new mongoose.Schema({
    text: String,
    author: Author,
    votes: Number,
    comments: [Comment],
    date: Date
});

var Question = new mongoose.Schema({
    title: String,
    text: String,
    author: Author,
    views: Number,
    votes: Number,
    comments: [Comment],
    answers: [Answer],
    tags: [String],
    date: Date
});

module.exports = mongoose.model('Question', Question);