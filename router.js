var models = require('./Public/Model/user');
var express = require('express');
var router = express.Router();

module.exports = function (app, bodyParser) {
	var doctor, patient;

	//doctor = new models.Doctor;

	router.use(bodyParser.json());

	//router to login doctor and chec if it exist or not
	router.route('/getDoctor').get(function (req, res) {

		var firstName = req.query.firstName;
		var lastName = req.query.lastName;
		models.Doctor.findOne({
			firstName: firstName,
			lastName: lastName
		}, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				res.status(200).send(data);
			}
		})
	})

	router.route('/submitDoctor').post(function (req, res) {

		//create doctor model;
		doctor = new models.Doctor({
			"firstName": req.body.firstName,
			"lastName": req.body.lastName
		});

		doctor.save(function (err, data) {
			if (err) {
				console.log(err);
			} else
				console.log(data);
			res.sendStatus(200);
		});
	});


	router.route('/submitPatient').post(function (req, res) {

		//create patient model
		patient = new models.Patient({
			"firstName": req.body.firstName,
			"lastName": req.body.lastName,
			"visits": {
				"complaint": req.body.complaint,
				"billingAmount": req.body.billingAmount
			},
			"age": req.body.age,
			"familyDoctor": [{
				firstName: req.body.familyDoctor.firstName,
				lastName: req.body.familyDoctor.lastName,
			}],
			"createdAt": req.body.createdAt,
			"lastModified": req.body.lastModified
		});


		patient.save(function (err, data) {
			if (err) {
				console.log(err);
			} else
				console.log(data)
			res.sendStatus(200);
		});
	});

	app.use('/', router);
};