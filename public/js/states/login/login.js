app.config(function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/states/login/login.html', 
    controller: 'LoginCtrl'
  });
});

app.controller('LoginCtrl', function ($scope) {});