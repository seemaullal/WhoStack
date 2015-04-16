app.config(function ($stateProvider) {
  $stateProvider.state('review', {
    resolve: {
      getLoggedInUser: function(MemberFactory, $state){
        return getCurrentUser.then(function(user){
          if(user){
            return user;
          }else{
            $state.go("loginState");
          }
        });
      }
    },
    url: '/review',
    templateUrl: 'js/review/review.html', 
    controller: 'ReviewCtrl'
  });
});

app.controller('ReviewCtrl', function ($scope) {});