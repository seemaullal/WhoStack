var SlackStrategy = require("passport-slack").Strategy;
var config = require("./config");
var User = require('./models/index.js');
// var passport = require('passport')(require('passport'));
//configure strategy
module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		console.log("serializing")
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function (err, user) {
	  	console.log("deserializing")
	    done(err, user);
	  });
	});
	passport.use(new SlackStrategy({
	    clientID: config.slackSecrets.clientID,
	    clientSecret: config.slackSecrets.clientSecret,
	    callbackURL: 'http://127.0.0.1:3000/'
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	console.log("preparing to find or create")
	  	console.log("accessToken", accessToken);
	  	console.log("refreshToken", refreshToken);
	  	console.log("profile", profile)
	  	console.log("user:", User)
/*	    User.findOrCreate({ SlackId: profile.id }, function (err, user) {
	    	console.log("error for find/create", err)
	    	console.log("did we even get to our user? ",user)
	      return done(err, user);
	    });*/
		User.findOne({ "SlackId": profile.id }, function (err, user) {
	    	console.log("error for find/create", err)
	    	console.log("did we even get to our user? ",user)
	      return done(err, user);
	    });
	  }
	));

	return passport;
};

