var SlackStrategy = require("passport-slack").Strategy;
var config = require("./config");
// var passport = require('passport')(require('passport'));
//configure strategy
module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function (err, user) {
	    done(err, user);
	  });
	});
	passport.use(new SlackStrategy({
	    clientID: config.slackSecrets.clientID,
	    clientSecret: config.slackSecrets.clientSecret
	  },
	  function(accessToken, refreshToken, profile, done) {
	    User.findOrCreate({ SlackId: profile.id }, function (err, user) {
	      return done(err, user);
	    });
	  }
	));

	return passport;
};

