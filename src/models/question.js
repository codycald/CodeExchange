var mongoose = require('mongoose');

var Question = new mongoose.Schema({
    title: String,
    text: String,
    author: Author,
    views: Number,
    votes: Number,
    comments: [Comment],
    answers: [Answer],
    tags: [String]
});

var Answer =  new mongoose.Schema({
    text: String,
    author: Author,
    votes: Number,
    comments: [Comment]
});

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

module.exports = mongoose.model('Question', Question);