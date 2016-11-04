'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sanitizer = require('express-sanitizer');
var validator = require('express-validator');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var routes = require('./routes');
var User = require('./models/user');

mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost/stackoverflowclone');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(validator());
app.use(sanitizer());


// Passport config
app.use(require("express-session")({
    secret: process.env.SECRET || "MY_SECRET",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api', routes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server started');
});