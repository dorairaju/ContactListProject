var myApp = angular.module("myApp",[]);

myApp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {

	console.log("hello world from controller");

	var refresh = function(){

		$http.get('/contactlist').success(function(response) {
			//console.log("I got the data I requested.");
			//console.log(response);
			$scope.contactlist = response;
			$scope.contact = "";
		});

	};

	refresh();

	$scope.addContact = function() {

			console.log($scope.contact);
			$http.post('/contactlist', $scope.contact).success(function(response) {
				//console.log(response);
				refresh();
			});


		};
	$scope.remove = function(id) {
		console.log(id);

		$http.delete('/contactlist/'+id).success(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		console.log(id);
      
		$http.get('/contactlist/'+id).success(function(response) {

			$scope.contact = response[0];

		});
      
	}

	$scope.update = function() {
		console.log($scope.contact._id);

		$http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function(response) {
			refresh();
		});
	}

	$scope.clear = function() {
		$scope.contact = "";
	}

/*
	$http.get('https://api.github.com/users/robconery').success(function(response) {

		console.log(response);

	});
*/

/*
	$http.get('/contactlist').then(function(response) {
		console.log("I got the data I requested.");
		console.log(response);
		$scope.contactlist = response.data;
	}, function(error) {
		console.log("Failed to get the data.");
	});
*/

	//$scope.contactlist = contactlist;

}]);

/*
function AppCtrl() {
	console.log("hello world from controller");
}
*/