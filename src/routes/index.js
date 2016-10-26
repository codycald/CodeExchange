var express = require('express');
var router = express.Router();

// Login
router.post('/login', function(req, res) {
    console.log('Sucessfully logged in');
    res.json({username: 'testuser'});
});

// Register
router.post('/register', function(req, res) {
    console.log('Sucessfully registered');
    res.json({username: 'testuser'});
});

router.get('/logout', function(req, res) {
    console.log('Successfully logged out');
    res.status(200).json({msg: "ok"});
})

module.exports = router;