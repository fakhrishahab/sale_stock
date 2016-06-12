var express 	= require('express'),
	InitRequest	= require('./request'),
	request 	= require('request'),
	async 		= require('async'),
	middleware 	= require('./middleware'),
	route		= express.Router();

var products = [], pick_products = [];

route

.get('/', function(req, res, next){
	
	async.parallel([
	    InitRequest.getProduct,
	    InitRequest.pickProduct
	], function (err, result) {
		products = [].concat(result[0]);
		pick_product = [].concat(result[1]);
		res.render('index', {
			controller : 'indexController as ic',
			template : 'partials/product_index',
			script : [
				'./script/directive/indexDirective.js',
				'./script/controller/indexController.js'
			],
			product : result[0],
			pick_product : result[1],
			logon : req.cookies.SS_USER_SESSION
		})
	});
})

.get('/cart', function(req, res, next){
	res.render('index', {
		controller: 'cartController as cc',
		template: 'partials/cart_content',
		script : [
			'./script/controller/cartController.js'
		],
		product : products || [],
		pick_product : pick_products,
		logon : req.cookies.SS_USER_SESSION
	})
})

.get('/logout', middleware.checkAuth, function(req, res, next){
	res.cookie('SS_USER_SESSION', '', {expires : new Date(Date.now())});
	res.redirect('./');
})

.get('/checkout', middleware.checkAuth, function(req, res, next){
	res.redirect('./');
})

.get('/favourite', middleware.checkAuth, function(){

})

module.exports = route;