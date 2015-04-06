var bodyParser =require('body-parser');
var http = require('http');
var express = require('express');
var app = express();
require('./Public/Model/user');

// mongo DB dependencies 
var mongoose = require('mongoose');

// create mongoose connection
mongoose.connect('mongodb://localhost:27017/DoctorPatientDB');

// pass app bodyParser and mongoose as a paramenter to router.js file
require('./router')(app,bodyParser,mongoose);

// app use static Folder
app.use(express.static( __dirname + '/Public'));

// home route
app.get('/', function (req, res) {
    res.sendFile( __dirname + '/Public/Views/index.html');
});

// open port 3000 for application
var port = process.env.port || 3000;

app.listen(port);
console.log('port running at 3000');



