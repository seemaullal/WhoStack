'use strict';
var express = require('express');
var router = express.Router();
var config = require("../config");
var request = require('request');
var models = require("../models/index");



var token;
// router.get('/game', function(req, res, next) {
// 	if (req.session.token) {
// 		console.log('already had token',req.session.token);
// 		res.sendFile('./game.html', {root: './'});
// 	}
// 	else res.redirect('/login');
// });

router.get('/auth' , function(req,res,next) {
	var sesh = req.session;
	var url = 'https://slack.com/api/oauth.access';
	var qs = config.slackSecrets;
	qs.code = req.query.code;
	qs.redirect_uri = 'http://127.0.0.1:3000/api/auth'; //refers to the original callback URI (for authentication) https://api.slack.com/docs/oauth
	request({url: url, qs: qs }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var body = JSON.parse(body);
			var token = body.access_token;
			sesh.token = token;
			sesh.save();
			request({url: "https://slack.com/api/auth.test", qs: {token: token} }, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					body = JSON.parse(body);
					var user_id = body.user_id;
					sesh.user_id = user_id;
					sesh.save();
					res.redirect('/review');
					// models.User.findOne({UserId: user_id}, function(err, user){
					// 	if (err) console.log(err);
					// 	// find an existing user from the database
					// 	else if (user) {
					// 		console.log(user);
					// 		user.Token = token;
					// 		user.save();
					// 	}
					// 	else {
					// 		models.User.create({ UserId: user_id, Token: token});
					// 	}
					// });
				}
			});
		}
	});
});

router.get('/login' , function(req, res, next) {
	req.redirect_uri = 'http://127.0.0.1:3000/api/auth';
	// req.redirect_uri = 'https://whostack.herokuapp.com/game';
	res.redirect('https://slack.com/oauth/authorize?client_id='+ config.slackSecrets.client_id + '&redirect_uri=' +  req.redirect_uri + '&state=' + config.slackSecrets.state);

});

router.get("/groups", function(req, res, next){
	//make a call to slack's api for channels.list with token (how do we now find the right token from our model?)
	//that will return an object that contains array of channel objects
	//we will then send on our own page a 
	var url = "https://slack.com/api/groups.list";
	var qs = {token: req.session.token};
	request({url: url, qs: qs }, function (error, response, body) {
		body = JSON.parse(body);
		res.send(body);
	});
});

router.get('/user/:id', function(req, res, next) {
	var userId = req.params.id;
	var url = "https://slack.com/api/users.info";
	var qs = {
		token: req.session.token,
		user: userId
	};
	request({url: url, qs: qs }, function (error, response, body) {
		body = JSON.parse(body);
		res.send(body);
	});
});


router.get('/currentUser', function(req, res, next) {
	var url = "https://slack.com/api/users.info";
	var qs = {
		token: req.session.token,
		user: req.session.user_id
	};
	request({url: url, qs: qs }, function (error, response, body) {
		body = JSON.parse(body);
		res.send(body);
	});
});

module.exports = router;


/*
STEPS
1. Authenticate self. This returns a req with _parsedOriginalUrl with query that has the code you need 
(req.query may work?)
2. Use the code on the Oauthaccess method to get the token
3. Use the auth.test method with your token to get your user id
(if you need User name or anything use User.info method w/ token and user id )
4. Use channels.list with your token and it will list all channels. for each channel, is_member says if the 
current user is a member
5.Channel_info has info about members in channel
*/
