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
		billingAmount: Number
	},
	age: Number,
	familyDoctor: [doctorSchema],
	createdAt: Date,
	lastModified: Date
});

var Patient = mongoose.model('Patient', patientSchema)

module.exports = {
	Doctor: Doctor,
	Patient: Patient
};