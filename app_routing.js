var express 	= require('express'),
	request 	= require('request'),
	route		= express.Router();

route.get('/', function(req, res){
	var products;
	request('http://localhost:3000/api/product/get_all', function(error, response, body){
		products = body;
		res.render('index',{
			product : products
		})
	})
	
})

module.exports = route;