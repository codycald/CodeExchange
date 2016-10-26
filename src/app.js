'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var routes = require('./routes');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server started');
});