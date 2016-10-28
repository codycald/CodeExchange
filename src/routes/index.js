var express = require('express');
var router = express.Router();
var User = require('../models/user');
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
})

// Status
router.get('/status', function(req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).json({authenticated: true, username: req.user.username});
    }
    return res.status(200).json({authenticated: false});
});

module.exports = router;