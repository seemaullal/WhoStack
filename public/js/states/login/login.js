app.config(function ($stateProvider) {
  $stateProvider.state('home', {
  	resolve: {
  		isLoggedIn: function($state, MemberFactory) {
  			return MemberFactory.getCurrentUser().then( function (user) {
  				console.log('here');
  				if (user.user) {
  					$state.go('review');
  				}
  			});
  		}
  	},
    url: '/',
    templateUrl: 'js/states/login/login.html', 
    controller: 'LoginCtrl'
  });
});

app.controller('LoginCtrl', function ($scope) {});