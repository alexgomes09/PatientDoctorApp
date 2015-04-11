var mongoose = require('mongoose');
var bcrypt = require("bcrypt");

//doctorSchema for doctorModel
var doctorSchema = new mongoose.Schema({
	"username": String,
	"password":String,
	"firstName": String,
	"lastName": String
});

// Bcrypt middleware
doctorSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// Password verification
doctorSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};


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

var Doctor = mongoose.model('Doctor', doctorSchema);
// mongoose model for Doctor
//export patient and doctor model
module.exports = {
	Doctor: Doctor,
	Patient: Patient
};