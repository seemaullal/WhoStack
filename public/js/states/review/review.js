app.config(function ($stateProvider) {
  $stateProvider.state('review', {
    resolve: {
      getLoggedInUser: function(MemberFactory, $state){
        return MemberFactory.getCurrentUser().then(function(user){
          if(user.user){
            return user.user;
          }else{
            $state.go("home");
          }
        });
      return;
      }
    },
    url: '/review',
    templateUrl: 'js/states/review/review.html',
    controller: 'ReviewCtrl'
  });
});

app.controller('ReviewCtrl', function ($scope, GroupFactory, MemberFactory) {
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