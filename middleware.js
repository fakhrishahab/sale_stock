var LocalStrategy = require('passport-local').Strategy,
	passport 	= require('passport'),
	locallydb = require('locallydb'),
	users  = new locallydb('./.users');


module.exports = {
	checkAuth: function(req, res, next){
		if(req.cookies.SS_USER_SESSION){
			next()
		}else{
			res.redirect('/')
		}
	}
}