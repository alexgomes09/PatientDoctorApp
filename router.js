
var models = require('./Public/Model/user');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

module.exports = function (app, bodyParser) {
	var doctor, patient;

	router.use(bodyParser.json());
	app.use(passport.initialize());
	app.use(passport.session());

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
	});

	/////// trying passport jS

	// router.route('/getDoctor').get(function (req, res) {

	// 	passport.use(new LocalStrategy(function (username, password, done) {
	// 		models.Doctor.findOne({
	// 			firstName: req.query.firstName
	// 		}, function (err, user) {
	// 			if (err) {
	// 				return done(err);
	// 			}
	// 			if (!user) {
	// 				return done(null, false, {
	// 					message: 'Incorrect username.'
	// 				});
	// 			}
	// 		});
	// 	}));
		
	
	// })

//	router.get('/getDoctor',
//		passport.authenticate('local', {
//			successRedirect: '/',
//			failureRedirect: '/getDoctor'
//		})
//	);



	/// trying passport jS	

	// get all the doctor and send it back to angular
	router.route('/getAllDoctor').get(function (req, res) {
		var q = models.Doctor.find({});
		q.exec(function (err, data) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(data));
		})
	})

	//get patient and and send data back to whoever made the request
	router.route('/getPatient').get(function (req, res) {
		var q = models.Patient.find({});
		q.exec(function (err, data) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(data));
		})

	});

	// handeles search patient with patient lastName or doctor lastName
	router.route('/searchPatient').get(function (req, res) {

		var lastName = req.query.data;

		models.Patient.find({
			$or: [{
				"lastName": lastName
			}, {
				"familyDoctor.lastName": lastName
			}]
		}, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				res.end(JSON.stringify(data));
			}
		})
	})

	//save the doctor. Basically register a new doctor
	router.route('/submitDoctor').post(function (req, res) {

		//create doctor model;
		doctor = new models.Doctor({
			"firstName": req.body.firstName,
			"lastName": req.body.lastName
		});

		//save doctor in doctor model
		doctor.save(function (err, data) {
			if (err) {
				console.log(err);
			} else
				console.log(data);
			res.sendStatus(200);
		});
	});

	// delete the patient based on the firstName and lastName
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
				console.log("Patient Deleted") // if success then output patient deleted message
				res.status(200).send(firstName + ' ' + lastName + " was deleted");
			}
		})

	})

	//register a patient in patient model
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

		//save the patient
		patient.save(function (err, data) {
			if (err) {
				console.log(err); // show the err
			} else
				console.log(data)
			res.sendStatus(200); //if succeed then send 200 status
		});
	});

	// update the patient based on the ID that was sent from angular
	router.route('/updatePatient').post(function (req, res) {
		var id = req.body._id;
		models.Patient.update({
			_id: id
		}, {
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
				res.end(JSON.stringify("Patient was updated")); // if success then end the response and send success message
			}
		});
	});

	app.use('/', router);
};