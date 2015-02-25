app.factory('TokenFactory', function ($http) {
	return {
		getToken: function(client_id, client_secret, code, state){
			var url = "https://slack.com/api/oauth.access";
			return $http.get(url, {
				params: {
					client_id: client_id, 
					client_secret: client_secret, 
					code: code, 
					state: state
				}
			});

		}
	};
});