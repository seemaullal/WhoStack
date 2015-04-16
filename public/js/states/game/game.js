app.config(function ($stateProvider) {
  $stateProvider.state('game', {
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
    url: '/game',
    templateUrl: 'js/game/game.html', 
    controller: 'GameCtrl'
  });
});

app.controller('GameCtrl', function ($scope) {});