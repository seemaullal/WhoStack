var app = angular.module("WhoStack", []);

app.controller("MainController", function ($scope, GroupFactory, MemberFactory){
	GroupFactory.getGroups().then(function(groups){
		$scope.groups = groups.groups
	})
	$scope.selectedIndex = -1;
	$scope.membersphotolinks = [ ];
	$scope.members = [];
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

	}
	$scope.photoClicked = function(member, $index) {
		console.log(member);
		$scope.selectedIndex = $index;
		$scope.name = member.real_name;
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