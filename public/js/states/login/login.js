app.config(function ($stateProvider) {
  $stateProvider.state('loginState', {
    url: '/',
    templateUrl: 'public/js/login/login.html', 
    controller: 'LoginCtrl'
  });
});

app.controller('LoginCtrl', function ($scope) {});