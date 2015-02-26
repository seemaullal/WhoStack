var app = angular.module("WhoStack", []);

app.controller("MainController", function ($scope, GroupFactory){
	GroupFactory.getGroups().then(function(groups){
		$scope.groups = groups.groups
		console.log("our groups on the scope are", groups)
	})
	$scope.somefunction = function(option){
		console.log($scope.selectedgroup)
		console.log("click event occured")
		console.log("option",option)
	}
	
});

	// UserFactory.getUser().then(function(user){
	// 	console.log("second");
	// 	console.log(user);
	// 	$scope.user = user;
	// });

// app.factory("UserFactory", function ($http){
// 	return{
// 		getUser: function(){
// 			return $http.get().then(function (response) {
//                 console.log("first");
//                 console.log(response);
//                 return response.data;
//             });
// 		}
// 	};
// });