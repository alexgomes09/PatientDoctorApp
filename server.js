var bodyParser =require('body-parser');
var http = require('http');
var express = require('express');
var app = express();

// mongo DB dependencies 
var Db=require("mongodb").Db,MongoClient=require("mongodb").MongoClient,Server=require("mongodb").Server,ReplSetServers=require("mongodb").ReplSetServers,ObjectID=require("mongodb").ObjectID,Binary=require("mongodb").Binary,GridStore=require("mongodb").GridStore,Grid=require("mongodb").Grid,Code=require("mongodb").Code,BSON=require("mongodb").pure().BSON,assert=require("assert");

// create instance of mongo db on port 27017
var db = new Db('DoctorPaitentDB', new Server('localhost', 27017),{safe:false});

// pass app bodyParser and db as a paramenter to router.js file
require('./router')(app,bodyParser,db);



// create Doctor document
	db.open(function(err, db) {
		db.collection("Doctor").drop();
		db.collection("Patient").drop();
				db.createCollection("Doctor",function(err,result){
			db.close();
			})
				db.createCollection("Patient",function(err,result){
			db.close();
			})
		});

app.use(express.static( __dirname + '/Public'));

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/Public/Views/index.html');
});


var port = process.env.port || 3000;

app.listen(port);
console.log('port running at 1337');



