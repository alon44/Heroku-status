var dateFormat = require('dateformat');
var config = require('./config.js');

var utils = {};

utils.createTimeString = function(dt1, dt2){
	// Get the current date string without time
	var date1 = new Date(dt1);
	var currentDate =  dateFormat(date1, config.dateFormat);
	// Set time string to current date and time
	var timeString = currentDate + ' ' + dateFormat(date1, config.timeFormat) + ' - ';
					 
	// Check if this is next date				   
	if(dt2 != null){
		// Get the next date string without time
		var date2 = new Date(dt2);
		var nextDate = dateFormat(date2, config.dateFormat);
							
		// Check if this is not the same date
		if(nextDate != currentDate){
			// Add the next date string if it's not the same date
			timeString+= nextDate + ' ';
		}
		
		// Add the next date time
		timeString+= dateFormat(date2, config.timeFormat);
	}
	else{
		// If there is no next date, add "now" to the string
		timeString+= 'now';
	}
	
	// Add GMT
	timeString+= ' ' + dateFormat(date1, config.timeZoneFormat);
	
	return timeString;
}

module.exports = utils;