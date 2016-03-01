//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var request = require('request');


var db = require('./server/config/database')
mongoose.connect(db.url);
var port = process.env.PORT || 1335;

var questions = require('./server/routes/routine-routes');

//var tokenGen = process.env.FIREBASETOKEN_URI;

//mongoose.connect(database);
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/www/'));

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// apply the routes to our application with the prefix /api
app.use('/api', questions);

app.listen(port);
console.log('Login service is running on port: ' + port);
