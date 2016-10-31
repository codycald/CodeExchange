var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Question = require('../models/question');
var passport = require('passport');

// Login
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({username: req.user.username, votedPosts: req.user.votedPosts});
});

// Register
router.post('/register', function(req, res) {
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, function() {
                res.json({username: req.user.username, votedPosts: user.votedPosts});
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
        return res.status(200).json({authenticated: true, username: req.user.username, votedPosts: req.user.votedPosts});
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
router.post('/questions', isLoggedIn, function(req, res) {
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
        answers: [],
        date: Date.now()
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

router.post('/questions/:id/answer', isLoggedIn, function(req, res) {
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
           comments: [],
           date: Date.now()
       }
       question.answers.push(answer);
       question.save();
       res.json({answer: question.answers.slice(-1)[0]});
    });
});

router.post('/questions/:id/comment', isLoggedIn, function(req, res) {
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
           question.save();
           return res.status(200).json({comment: question.comments.slice(-1)[0]});
       }

       var answer = question.answers.find(function(ans) {
           return ans._id == req.body.id;
       });

       if (!answer) {
           return res.status(500).json({message: 'Could not add comment to answer'});
       }
       answer.comments.push(comment);
       question.save();
       res.status(200).json({comment: answer.comments.slice(-1)[0]});
       
    });
});

//================================
// Upvoting / Downvoting Routes
//==================================

router.post('/questions/:id/upvote', isLoggedIn, function(req, res) {
    
    User.findById(req.user.id, function(err, user) {
        if (err) {
            // Should never reach this point
            return res.status(500).json({message: err.message});
        }
        
        Question.findById(req.params.id, function(err, question) {
            if (err) {
                return res.status(500).json({message: err.message});
            }
            
            // Check if the user has voted on this post before
            var votedPost = user.votedPosts.find(function(post) {
                return post.id.equals(req.body.id);
            });
            
            // Upvoting the question
            if (req.params.id == req.body.id) {
                // Updating a previous vote
                if (votedPost && votedPost.isupvoted) {
                    var index = user.votedPosts.indexOf(votedPost);
                    user.votedPosts.splice(index, 1);
                    question.votes--;
                } else if (votedPost && !votedPost.isupvoted) {
                    votedPost.isupvoted = true;
                    question.votes += 2;
                } else {
                    question.votes++;
                    user.votedPosts.push({id: req.body.id, isupvoted: true});
                }
                question.save();
                user.save();
                return res.status(200).json({voteTotal: question.votes, votedPosts: user.votedPosts});
            }
            
            // Upvoting an answer
            var answer = question.answers.find(function(ans) {
                return ans._id == req.body.id;
            });
            
            if (!answer) {
                return res.status(500).json({message: 'Could not upvote answer'});
            }
            
            // Updating previous vote
            if (votedPost && votedPost.isupvoted) {
                var index = user.votedPosts.indexOf(votedPost);
                user.votedPosts.splice(index, 1);
                answer.votes--;
            } else if (votedPost && !votedPost.isupvoted) {
                votedPost.isupvoted = true;
                answer.votes += 2;
            } else {
                answer.votes++;
                user.votedPosts.push({id: req.body.id, isupvoted: true});
            }
            question.save();
            user.save();
            return res.status(200).json({voteTotal: answer.votes, votedPosts: user.votedPosts});
        });
    });
});

router.post('/questions/:id/downvote', isLoggedIn, function(req, res) {
    
    User.findById(req.user.id, function(err, user) {
        if (err) {
            // Should never reach this point
            return res.status(500).json({message: err.message});
        }
        
        Question.findById(req.params.id, function(err, question) {
            if (err) {
                return res.status(500).json({message: err.message});
            }
            
            // Check if the user has voted on this post before
            var votedPost = user.votedPosts.find(function(post) {
                return post.id.equals(req.body.id);
            });
            
            // Downvoting the question
            if (req.params.id == req.body.id) {
                // Updating a previous vote
                if (votedPost && !votedPost.isupvoted) {
                    var index = user.votedPosts.indexOf(votedPost);
                    user.votedPosts.splice(index, 1);
                    question.votes++;
                } else if (votedPost && votedPost.isupvoted) {
                    votedPost.isupvoted = false;
                    question.votes -= 2;
                } else {
                    question.votes--;
                    user.votedPosts.push({id: req.body.id, isupvoted: false});
                }
                question.save();
                user.save();
                return res.status(200).json({voteTotal: question.votes, votedPosts: user.votedPosts});
            }
            
            // Downvoting an answer
            var answer = question.answers.find(function(ans) {
                return ans._id == req.body.id;
            });
            
            if (!answer) {
                return res.status(500).json({message: 'Could not downvote answer'});
            }
            
            // Updating previous vote
            if (votedPost && !votedPost.isupvoted) {
                var index = user.votedPosts.indexOf(votedPost);
                user.votedPosts.splice(index, 1);
                answer.votes++;
            } else if (votedPost && votedPost.isupvoted) {
                votedPost.isupvoted = false;
                answer.votes -= 2;
            } else {
                answer.votes--;
                user.votedPosts.push({id: req.body.id, isupvoted: false});
            }
            question.save();
            user.save();
            return res.status(200).json({voteTotal: answer.votes, votedPosts: user.votedPosts});
        });
    });
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(500).json({ message: 'You must be logged in to do that' });
}

module.exports = router;