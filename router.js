var models = require('./Public/Model/user');
var express = require('express');
var router = express.Router();

module.exports = function(app,bodyParser){

	router.use(bodyParser.json());

	router.route('/submitDoctor').post(function(req, res) {

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
	
	
	router.route('/submitPatient').post(function(req,res){

		var patient = new models.Patient({
			"firstName" : req.body.firstName,
			"lastName" : req.body.lastName,
			"visits":{
				"complaint":req.body.complaint,
				"billingAmount":req.body.billingAmount
			},
			"age": req.body.age,
			"familyDoctor":[{
				firstName:req.body.familyDoctor.firstName,
				lastName:req.body.familyDoctor.lastName,
			}],
			"createdAt": req.body.createdAt,
			"lastModified": req.body.lastModified
		});
		
		patient.save(function(err,data){
			if(err) {
               console.log(err)
            }else
//				console.log(data)
				res.sendStatus(200);
		})
	})
	
	app.use('/',router);
};




