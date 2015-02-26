app.factory('MemberFactory', function($http){
	return {
		getUserInformation : function(userId) {
			return $http.get('/user/' + userId).then(function(response) {
				return response.data;
			})
		}


	};
});