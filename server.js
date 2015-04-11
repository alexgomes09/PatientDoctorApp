var bodyParser =require('body-parser');
var http = require('http');
var models = require('./Public/Model/User');
var express = require('express');
var app = express();
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var port = process.env.port || 3000;
//require('./Public/Model/User');

// mongo DB dependencies 
var mongoose = require('mongoose');

// create mongoose connection
mongoose.connect('mongodb://patientdoctorapp:patientdoctorapp@ds061391.mongolab.com:61391/patientdoctordb');

// pass app bodyParser and mongoose as a paramenter to router.js file
require('./router')(app,bodyParser,mongoose);
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(express.static( __dirname + '/Public'));
app.use(expressSession({ secret: 'keyboard cat', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  models.Doctor.findOne({"_id":id}, function (err, user) {
    done(err, user);
  });
});

passport.use('local',new LocalStrategy(function(username, password, done) {
  models.Doctor.findOne({ username: username }, function(err, user) {
    if (err) { console.log(err); return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

// home route
app.get('/', function (req, res) {
    res.sendFile( __dirname + '/Public/Views/index.html');
});

app.post('/login',
  passport.authenticate ('local', { successRedirect: '/#/home',
                                   failureRedirect: '/#/doctorLogin'
                                    })
);

// takes care of logout route 
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/#/doctorLogin');
});


app.get('/checkLogin', function(req, res){
    if(req.user == null)
    {
      res.send({message: 'Not logged in.'})
    }
});


app.listen(process.env.PORT, process.env.IP);

console.log('port running at 3000');
