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

//================
// Answer routes
//================

router.post('/questions/:id/answer', function(req, res) {
    Question.findById(req.params.id, function(err, question) {
       if (err) {
           return res.status(500).json({message: err.message});
       }
       var answer = {
           text: req.body.text,
           author: {
               username: req.body.username,
               id: req.user._id
           },
           votes: 0,
           comments: []
       }
       question.answers.push(answer);
       question.save();
    });
});

router.post('/questions/:id/comment', function(req, res) {
    Question.findById(req.params.id, function(err, question) {
       if (err) {
           return res.status(500).json({message: err.message});
       }
       var comment = {
           text: req.body.text,
           author: {
               username: req.body.username,
               id: req.user.id
           }
       }
       
       if (req.params.id == req.body.id) {
           question.comments.push(comment);
           console.log(question.comments);
           question.save();
           return res.status(200).json({message: 'Comment added to question'});
       }

       var answer = question.answers.filter(function(ans) {
           return ans._id == req.body.id;
       });

       if (answer.length != 1) {
           return res.status(500).json({message: 'Could not add comment to answer'});
       }
       answer[0].comments.push(comment);
       question.save();
       res.status(200).json({message: 'Comment added to answer'});
       
    });
});

//================================
// Upvoting / Downvoting Routes
//==================================

router.post('/questions/:id/upvote', function(req, res) {
    Question.findById(req.params.id, function(err, question) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        
        if (req.params.id == req.body.id) {
            question.votes++;
            question.save();
            return res.status(200).json({message: 'Upvoted question'});
        }
        
        var answer = question.answers.find(function(ans) {
            return ans._id == req.body.id;
        });
        
        if (!answer) {
            return res.status(500).json({message: 'Could not upvote answer'});
        }
        answer.votes++;
        question.save();
        res.status(200).json({message: 'Upvoted answer'});
    });
});

router.post('/questions/:id/downvote', function(req, res) {
    Question.findById(req.params.id, function(err, question) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        
        if (req.params.id == req.body.id) {
            question.votes--;
            question.save();
            return res.status(200).json({message: 'Downvoted question'});
        }
        
        var answer = question.answers.find(function(ans) {
            return ans._id == req.body.id;
        });
        
        if (!answer) {
            return res.status(500).json({message: 'Could not downvote answer'});
        }
        answer.votes--;
        question.save();
        res.status(200).json({message: 'Downvoted answer'});
    });
});

module.exports = router;