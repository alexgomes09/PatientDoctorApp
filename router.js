module.exports = function(app,bodyParser,db){
	var express = require('express');
	var router = express.Router();
	
	router.use(bodyParser.json());
	
	var doctor = router.route('/submitDoctor');
	
	doctor.post(function(req, res) {
        console.log(req.body)
		res.sendStatus(200);
    });
	
	
	db.open(function(err, db) {
            db.dropCollection("chatHistory",function(err,result){
                console.log(result);
            db.close();
            })
        });
	
	
	

	
	app.use('/',router);
};




