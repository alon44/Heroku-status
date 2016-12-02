var express = require('express');
var service = require('./service.js');
var config = require('./config.js');

var app = express();

// Create server
app.get('/getHerokuData', function (req, res) {
    // Set CORS headers
	res.setHeader(config.allowOriginString, config.all);
	
	// Set content type header
	res.setHeader(config.contentTypeString, config.contentType);
	
	// Return heroku data from service
	service.getHerokuData.then(
        function(data) {
		res.write(JSON.stringify(data, null, 3));
		res.end();
        })
})

var server = app.listen(40, function () {
   console.log(config.listenMessage);
})