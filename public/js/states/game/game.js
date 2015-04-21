app.config(function ($stateProvider) {
  $stateProvider.state('game', {
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
    url: '/game',
    templateUrl: 'js/states/game/game.html', 
    controller: 'GameCtrl'
  });
});

app.controller('GameCtrl', function ($scope) {
  //potential game logic:
  //we click start
  //a random person is selected and subtracted from the guessing pool
  //on click of a person it tells us who the person is and if they are the random person
  //if they are not the random person you lose a life
  //if they are the random person you get points and a new person is randomly chosen
  GroupFactory.getGroups().then(function(groups){
    $scope.groups = groups.groups;
  });
  $scope.selectedIndex = -1;
  MemberFactory.getCurrentUser().then(function(user) {
    $scope.currentUser = user;
  });
  $scope.getMembers = function(groupSelected){
    $scope.name = null; //nobody is selected when you click on a new group
    $scope.selectedIndex = -1; //nobody is selected when you click on a new group
    $scope.membersphotolinks = [ ];
    $scope.members = [];
    groupSelected.members.forEach(function(member) {
      MemberFactory.getUserInformation(member).then(function(member) {
        $scope.members.push(member);
        $scope.membersphotolinks.push(member.user.profile.image_72);
      });
    });
  };
  $scope.start = function(){
    //we click start
    $scope.randomPick();
  }
  $scope.randomPick = function(){
    //a random person is selected and subtracted from the guessing pool
    //display that person to the user
  }
    $scope.photoClicked = function(member, $index) {
    $scope.selectedIndex = $index;
    $scope.name = member.real_name;
    //on click of a person it tells us who the person is and if they are the random person
    //if they are not the random person you lose a life
    //if they are the random person you get points and a new person is randomly chosen
  };
});