//module.exports = function(app,bodyParser){
//	var express = require('express');
//	var router = express.Router();
//	
//	app.post('/submitDoctor',bodyParser.json(),function(res,req){
//		console.log(res.body);
//		console.log(req.body);
//	})
//
//};

var express = require('express');
var router = express.Router();

var doctor = router.route('/submitDoctor');

doctor.get(function(res,req){
	console.log(res);
	console.log(req);
})



