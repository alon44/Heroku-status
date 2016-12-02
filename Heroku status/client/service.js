app.factory('myService', function($http) {
  return {
    async: function() {
      return $http.get("http://localhost:40/getHerokuData"); 
    }
  };
});