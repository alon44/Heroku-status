var http = require("http");
var request=require("request");

var server = http.createServer(function(req,res){

	var resObject = { current: '', issues: []};
	
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
	
	res.setHeader('Content-Type', 'application/json');
	
	// Get current status
	request.get("https://status.heroku.com/api/v3/current-status",function(error,response,body){
           if(error){
                 console.log(error);
           }else{
				 // Save current status
                 resObject.current = JSON.parse(body).status.Production;
				 // Get issues data
				 request.get("https://status.heroku.com/api/v3/issues?since=2012-04-24&limit=1",function(error,response,issuesBody){
					if(error){
						console.log(error);
					}else{
						// Get updates data as json from last issue
						var updatesData = JSON.parse(issuesBody)[0].updates;
						// Run over all the issues updates
						for (i = updatesData.length - 1; i >= 0; i--) {
							// Create duration time string
							var timeString = 
								createTimeString(updatesData[i].created_at, (i != 0) ?  updatesData[i-1].created_at : null);
							
							// Create issue object and push him to issues
							var currentIssue = {time: timeString,
												status: updatesData[i].status_prod,
												contents: updatesData[i].contents};
								
							resObject.issues.push(currentIssue);
						}
						// Write response
						res.write(JSON.stringify(resObject, null, 3));
						res.end();
					}
				});
			}
	});
});

var createTimeString = function(dt1, dt2){
	// Get the current date string without time
	var date1 = new Date(dt1);
	var currentDate =  [date1.getMonth()+1,
					    date1.getDate(),
					    date1.getFullYear()].join('/');
	// Set time string to current date and time
	var timeString = currentDate + ' ' + 
					[(date1.getHours() < 10) ? '0'+date1.getHours():date1.getHours(),
					  (date1.getMinutes() < 10) ? '0'+date1.getMinutes():date1.getMinutes()].join(':') + ' - ';
					 
	// Check if this is next date				   
	if(dt2 != null){
		// Get the next date string without time
		var date2 = new Date(dt2);
		var nextDate = [date2.getMonth()+1,
					    date2.getDate(),
					    date2.getFullYear()].join('/');
							
		// Check if this is not the same date
		if(nextDate != currentDate){
			// Add the next date string if it's not the same date
			timeString+= nextDate + ' ';
		}
		
		// Add the next date time
		timeString+= [(date2.getHours() < 10) ? '0'+date2.getHours():date2.getHours(),
					  (date2.getMinutes() < 10) ? '0'+date2.getMinutes():date2.getMinutes()].join(':')
	}
	else{
		// If there is no next date, add "now" to the string
		timeString+= 'now';
	}
	
	return timeString;
}

server.listen(40);
console.log("Server is listening");