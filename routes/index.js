var express = require('express');
var router = express.Router();
var passport = require("passport");

// function isAuthenticated(req, res, next){
// 	if(req.user){
// 		next()
// 	}
// }
/* GET home page. */
function isAuthenticated (req, res, next) {
	// if req.user exists, simply continue on
	// i.e. user is authenticated
	if (req.user) next();
	// otherwise
	else {
		// build a 401
		var err = new Error('Unauthorized');
		err.status = 401;
		// and kick it to the next error handling middleware
		// i.e. the user is not authenticated
		next(err);
	}
}

router.get('/', function(req, res, next) {
	console.log("req.user is ",req.user)
	if(req.user) {
		res.sendFile('./index.html', {root: './'});
	}
	else {
		console.log("redirecting to auth/slack")
		res.redirect("/auth/slack");
	}
});

router.get('/auth/slack',passport.authenticate('slack'));

router.get('/auth/slack/callback',
	passport.authenticate('slack'),
	function (req, res) {
	// Successful authentication, redirect home.
	console.log("THIS IS THE REQ",req);
	res.redirect('/');
});

module.exports = router;
