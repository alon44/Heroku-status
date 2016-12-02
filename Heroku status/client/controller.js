app.controller('myCtrl', function($scope, myService) {
	
	$scope.getStatus = function(statusColor){
		switch(statusColor){
			case 'green':
				return 'Good';
			case 'yellow':
				return 'Minor';
			case 'red':
				return 'Critical';
			default:
				return 'None';
		}
	}
	
	$scope.getClass = function(statusColor){
		switch(statusColor){
			case 'green':
				return 'success';
			case 'yellow':
				return 'warning';
			case 'red':
				return 'danger';
			default:
				return 'None';
		}
	}
	
	$scope.getHerokuData = function(){
		myService.async().then(function(d) {
		$scope.data = d.data;
		});
	}
	
	$scope.getHerokuData();
});