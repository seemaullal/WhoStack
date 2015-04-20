app.config(function ($stateProvider) {
  $stateProvider.state('review', {
    resolve: {
      getLoggedInUser: function(MemberFactory, $state){
        // console.log('resolve is being called', $scope.currentUser);
        return MemberFactory.getCurrentUser().then(function(user){
          // console.log('line 7', user);
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

app.controller('ReviewCtrl', function ($scope) {
  console.log('in review state', $scope.currentUser);
  // $scope.user = getLoggedInUser;
});