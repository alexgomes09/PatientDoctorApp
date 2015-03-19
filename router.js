var express = require('express');
var app = express();
var router = express.Router();
console.log("p");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/submitDoctor', function(req, res) {
  res.send('About birds');
	res.sendStatus(200)
	console.log("Dfd")
})



module.exports = router;
