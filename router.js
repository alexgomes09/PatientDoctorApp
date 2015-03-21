var models = require('./Public/Model/user');
var express = require('express');
var router = express.Router();

module.exports = function(app,bodyParser){

	router.use(bodyParser.json());
	var doctor = router.route('/submitDoctor');

	

	
	doctor.post(function(req, res) {

		var newDoctor = new models.Doctor({
			firstName : req.body.firstName,
			lastName : req.body.lastName
		});

		newDoctor.save(function(err,data){
			if(err) {
               console.log(err)
            }else
				console.log(data)
				res.sendStatus(200);
		})
    });
	
	app.use('/',router);
};




