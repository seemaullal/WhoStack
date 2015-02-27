var app = angular.module("WhoStack", []);

app.controller("MainController", function ($scope, GroupFactory, MemberFactory){
	GroupFactory.getGroups().then(function(groups){
		$scope.groups = groups.groups
		console.log("our groups on the scope are", groups)
	})
	$scope.membersphotolinks = [ ];
	$scope.members = [];
	$scope.getMembers = function(groupSelected){
		$scope.membersphotolinks = [ ];
		$scope.members = [];
		groupSelected.members.forEach(function(member) {
			MemberFactory.getUserInformation(member).then(function(member) {
				$scope.members.push(member)
				$scope.membersphotolinks.push(member.user.profile.image_72);

			})
		});

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