module.exports = function(app,bodyParser,mongoose){
	var express = require('express');
	var router = express.Router();
	router.use(bodyParser.json());
	var doctor = router.route('/submitDoctor');
	var DoctorObject = mongoose.model('Doctors',{firstName:String,lastName:String});
	
	doctor.post(function(req, res) {
		var newDoctor = new DoctorObject({
			firstName : req.body.firstName,
			lastName : req.body.lastName
		})
		
		newDoctor.save(function(err,data){
			res.sendStatus(200);
		})
    });
	

	
	app.use('/',router);
};




