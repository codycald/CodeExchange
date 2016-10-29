var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Question = require('../models/question');
var passport = require('passport');

// Login
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({username: req.user.username});
});

// Register
router.post('/register', function(req, res) {
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, function() {
                res.json({username: req.user.username});
            });
        }
    });
});

// Logout
router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({msg: "Logged out"});
});

// Status
router.get('/status', function(req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).json({authenticated: true, username: req.user.username});
    }
    return res.status(200).json({authenticated: false});
});

//=================
// Question Routes
//=================

// Index
router.get('/questions', function(req, res) {
    Question.find({}, function(err, questions) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({questions: questions});
    });
});

// Show
router.get('/questions/:id', function(req, res) {
    Question.findById(req.params.id, function(err, question) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({question: question});
    });
});

// Create
router.post('/questions', function(req, res) {
    var question = {
        title: req.body.title,
        text: req.body.text,
        author: {
            id: req.user._id,
            username: req.body.username
        },
        votes: 0,
        views: 0,
        comments: [],
        answers: []
    };
    
    Question.create(question, function(err, newQuestion) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({question: newQuestion});
    });
});

module.exports = router;