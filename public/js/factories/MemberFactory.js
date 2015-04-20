app.factory('MemberFactory', function($http){
	return {
		getUserInformation : function(userId) {
			return $http.get('/api/user/' + userId).then(function(response) {
				return response.data;
			});
		},

		getCurrentUser : function() {
			console.log('factory line 10');
			return $http.get('/api/currentUser').then(function(response) {
				console.log('user', response.data);
				return response.data;
			});
		}


	};
});