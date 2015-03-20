var bodyParser =require('body-parser');
var http = require('http');
var express = require('express');
var app = express();
var router = require('./router')(app,bodyParser)

var port = process.env.port || 3000;

app.use(express.static( __dirname + '/Public'));

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/Public/Views/index.html');
});


// mongo DB dependencies 
var Db=require("mongodb").Db,MongoClient=require("mongodb").MongoClient,Server=require("mongodb").Server,ReplSetServers=require("mongodb").ReplSetServers,ObjectID=require("mongodb").ObjectID,Binary=require("mongodb").Binary,GridStore=require("mongodb").GridStore,Grid=require("mongodb").Grid,Code=require("mongodb").Code,BSON=require("mongodb").pure().BSON,assert=require("assert");

// create instance of mongo db on port 27017
var db = new Db('DoctorPaitentDB', new Server('localhost', 27017),{safe:false});


//db.open(function(err, db) {
//            db.dropCollection("chatHistory",function(err,result){
//                console.log(result);
//            db.close();
//            })
//        });


// while chat message is entered open database and insert msg
//        db.open(function(err, db) {
//          var collection = db.collection("chatHistory");
//          collection.insert([{msg:msg}], {w:1}, function(err, result) {
//            assert.equal(null, err);
//              db.close();
//         
//          });
//        });


app.listen(port);
console.log('port running at 1337');



