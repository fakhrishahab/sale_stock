var express 	= require('express'),
	InitRequest	= require('./request'),
	async 		= require('async'),
	route		= express.Router();



route.get('/', function(req, res, next){
	var products;
	async.parallel([
	    InitRequest.getProduct,
	    InitRequest.pickProduct
	], function (err, result) {
		res.render('index', {
			product : result[0],
			pick_product : result[1]
		})
	});
})

module.exports = route;