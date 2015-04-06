var mongoose = require('mongoose');

//doctorSchema for doctorModel
var doctorSchema = new mongoose.Schema({
	"firstName": String,
	"lastName": String
});
var Doctor = mongoose.model('Doctor', doctorSchema); // mongoose model for Doctor

//patientSchema for patientModel
var patientSchema = new mongoose.Schema({
	"firstName": String,
	"lastName": String,
	visits: {
		complaint: String,
		billingAmount: {type:Number}
	},
	age: {type:Number},
	familyDoctor: [doctorSchema],
	createdAt: {type:Date},
	lastModified: Date
});

//patient Model and calling patientSchema
var Patient = mongoose.model('Patient', patientSchema)

//export patient and doctor model
module.exports = {
	Doctor: Doctor,
	Patient: Patient
};