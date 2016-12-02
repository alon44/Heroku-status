var rp = require('request-promise');
var config = require('./config.js');
var utils = require('./utils.js');

var service = {};

service.getHerokuData = new Promise((resolve, reject) => {
	
	var resObject = { current: '', issues: []};

	// Get status data
	var getStatus = rp(config.statusURL)
    .then(function (result) {
		// Save current status
        resObject.current = JSON.parse(result).status.Production;
    })
    .catch(function (err) {
        // request failed
		console.log(config.statusFailed);
    });
	
	// Get issues data
	var getIssues = rp(config.issuesURL)
    .then(function (result) {
        // Get updates data as json from last issue
		var updatesData = JSON.parse(result)[0].updates;
		// Run over all the issues updates
		for (i = updatesData.length - 1; i >= 0; i--) {
			// Create duration time string
			var timeString = 
				utils.createTimeString(updatesData[i].created_at, (i != 0) ?  updatesData[i-1].created_at : null);
			
			// Create issue object and push him to issues
			var currentIssue = {time: timeString,
								status: updatesData[i].status_prod,
								contents: updatesData[i].contents};
				
			resObject.issues.push(currentIssue);
		}
    })
    .catch(function (err) {
        // request failed
		console.log(config.issuesFailed);
    });	
	
	Promise.all([getStatus, getIssues]).then(values => {
		// Write response object
		resolve(resObject);
	});
});

module.exports = service;