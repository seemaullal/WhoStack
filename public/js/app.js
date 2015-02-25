var app = angular.module("WhoStack", []);

app.controller("MainController", function ($scope){
	// console.log($location.search());
	// TokenFactory.getToken(client_id, client_secret, code, state);
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