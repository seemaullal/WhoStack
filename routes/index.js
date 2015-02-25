var express = require('express');
var router = express.Router();
var passport = require("passport");
var config = require("../config");
/* GET home page. */
router.get('/', function(req, res, next) {
	

	res.sendFile('./index.html', {root: './'});
});
router.get('/game', function(req, res, next) {
	console.log('req.query.code',req.query.code);

	res.sendFile('./game.html', {root: './'});
});

router.get('/login' , function(req, res, next) {
	req.client_id = config.slackSecrets.clientID;
	req.redirect_uri = 'http://127.0.0.1:3000/game';
	req.state = config.slackSecrets.state;
	res.redirect('https://slack.com/oauth/authorize?client_id='+ config.slackSecrets.clientID + '&redirect_uri=' +  req.redirect_uri + '&state=' + config.slackSecrets.state);
});
// router.get('/auth/slack',passport.authenticate('slack'));

// router.get('/auth/slack/callback', 
//   passport.authenticate('slack', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

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