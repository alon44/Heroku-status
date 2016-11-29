var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	
	$http.get("http://localhost:40/")
    .then(function(response) {
        $scope.data = response.data;
    });
	
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
});