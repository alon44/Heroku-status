var express = require('express');
var service = require('./service.js');
var config = require('./config.js');

var server = express();

server.use(function(req, res, next) {
  // Set CORS headers
  res.header(config.allowOriginString, config.all);
  next();
});

// Create server
server.get('/getHerokuData', function (req, res) {
	
	// Return heroku data from service
	service.getHerokuData.then(
        function(data) {
			res.json(data);
			res.end();
        })
})

module.exports = server;