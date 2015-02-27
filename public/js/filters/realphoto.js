app.filter('realphoto', function() {
	return function(photo_links) {
		var reals = [];
		for(var i = 0, len = photo_links.length; i < len; i++){
			if (photo_links[i].match(/amazon/g)){
				reals.push(photo_links[i]);
			}
		}
		console.log("reals",reals);
		return reals;
	};
});