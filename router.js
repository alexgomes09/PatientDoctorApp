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
	
	router.route('/getAllDoctor').get(function (req, res) {
		var q = models.Doctor.find({});
		q.exec(function (err, data) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(data));
		})
	})

	router.route('/getPatient').get(function (req, res) {
		var q = models.Patient.find({});
		q.exec(function (err, data) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(data));
		})

	});

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

	router.route('/deletePatient').delete(function (req, res) {
		var firstName = req.query.firstName;
		var lastName = req.query.lastName;
		models.Patient.remove({
			firstName: firstName,
			lastName: lastName
		}, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log("Patient Deleted")
				res.status(200).send(firstName + ' ' + lastName + " was deleted");
			}
		})

	})

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

	router.route('/updatePatient').post(function (req, res) {

		var id = req.body._id;

		models.Patient.update({	_id: id	}, {
			"firstName": req.body.firstName,
			"lastName": req.body.lastName,
			visits: {
				complaint: req.body.visits.complaint,
				billingAmount: req.body.visits.billingAmount
			},
			age: req.body.age,
			familyDoctor: [{
				firstName: req.body.familyDoctor[0].firstName,
				lastName: req.body.familyDoctor[0].lastName
			}],
			createdAt: req.body.createdAt,
			lastModified: req.body.lastModified
		}, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify("Patient was updated"));
			}
		});
	});

	app.use('/', router);
};