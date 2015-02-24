var app = angular.module("WhoStack", []);

app.controller("MainController", function ($scope, UserFactory){
	UserFactory.getUser().then(function(user){
		console.log("second");
		console.log(user);
		$scope.user = user;
	});
});

app.factory("UserFactory", function ($http){
	return{
		getUser: function(){
			return $http.get("https://slack.com/api/users.info?token=xoxp-2151814398-3389333122-3827854636-2f9e23&user=U03BF9T3L&pretty=1").then(function (response) {
                console.log("first");
                console.log(response);
                return response.data;
            });
		}
	};
});