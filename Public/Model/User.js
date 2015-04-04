var mongoose = require('mongoose');

var doctorSchema = new mongoose.Schema({
	"firstName": String,
	"lastName": String
});
var Doctor = mongoose.model('Doctor', doctorSchema);

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

var Patient = mongoose.model('Patient', patientSchema)

module.exports = {
	Doctor: Doctor,
	Patient: Patient
};