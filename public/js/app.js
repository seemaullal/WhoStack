var app = angular.module("WhoStack", ['ui.router']);

// app.config(function ($urlRouterProvider, $locationProvider) {
//     // This turns off hashbang urls (/#about) and changes it to something normal (/about)
//     $locationProvider.html5Mode(true);
//     // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
//     $urlRouterProvider.otherwise('/');
// });

app.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); //don't include the '#' in ui-view URLs
   $urlRouterProvider.otherwise('/'); //for URLs that don't have a state associated, just go to the URL
});


app.controller("MainController", function ($scope, GroupFactory, MemberFactory){
	console.log("maincontroller is loading")
	GroupFactory.getGroups().then(function(groups){
		$scope.groups = groups.groups
	})
	$scope.selectedIndex = -1;
	// $scope.membersphotolinks = [ ];
	// $scope.members = [];
	MemberFactory.getCurrentUser().then(function(user) {
		$scope.currentUser = user;
	})
	$scope.getMembers = function(groupSelected){
		$scope.name = null; //nobody is selected when you click on a new group
		$scope.selectedIndex = -1; //nobody is selected when you click on a new group
		$scope.membersphotolinks = [ ];
		$scope.members = [];
		groupSelected.members.forEach(function(member) {
			MemberFactory.getUserInformation(member).then(function(member) {
				$scope.members.push(member)
				$scope.membersphotolinks.push(member.user.profile.image_72);

			})
		});
		$scope.randomPerson = null;

	}
	$scope.photoClicked = function(member, $index) {
		console.log(member);
		$scope.selectedIndex = $index;
		$scope.name = member.real_name;
		//if you've asked for a random person it will compare the two people
		if($scope.randomPerson){
			if ($scope.name === $scope.randomPerson.user.profile.real_name){
				$scope.message = "Great job! You found " + $scope.name;
				$scope.randomPerson = null;
			}
			else{
				$scope.message = "Try again! You clicked on "+ $scope.name;
			}
		}
	}
	$scope.pickPerson = function(people){
		$scope.randomPerson = people[Math.floor(Math.random()*people.length)];
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