var mongoose = require('mongoose');

var doctorSchema = new mongoose.Schema({
	"firstName":String,
	"lastName":String
})
var Doctor = mongoose.model('Doctor',doctorSchema);
	
	

module.exports = {
	Doctor:Doctor
};
