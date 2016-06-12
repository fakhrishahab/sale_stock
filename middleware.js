module.exports = {
	checkAuth: function(req, res, next){
		if(req.cookies.SS_USER_SESSION){
			next()
		}else{
			res.redirect('/')
		}
	}
}