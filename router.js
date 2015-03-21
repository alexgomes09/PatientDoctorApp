module.exports = function(app,bodyParser,db){
	var express = require('express');
	var router = express.Router();
	
	router.use(bodyParser.json());
	
	var doctor = router.route('/submitDoctor');
	
	doctor.post(function(req, res) {
		db.open(function(err, result) {
          db.collection("Doctor").insert([{firstName:req.body.firstName,lastName:req.body.lastName}], {w:1}, function(err, result) {
              db.close();
         
          });
        });
		res.sendStatus(200);
    });
	

	
	app.use('/',router);
};




