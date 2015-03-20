module.exports = function(app,bodyParser){
	var express = require('express');
	var router = express.Router();
	
	router.use(bodyParser.json());
	
	router.route('/submitDoctor').post(function(req, res) {
        console.log(req.body)
		res.sendStatus(200);
    });
	
	
	
	
	app.use('/',router);

};




