var express = require('express'),
	route	= express.Router(),
	bodyParser 	= require('body-parser'),
	minify 	= require('express-minify'),
	api 	= require('./app_api'),
	routing = require('./app_routing');

var server = module.exports = 

	express()
		.set('view engine', 'ejs')
		.use(express.static('./dist'))
		.set('views', './dist/view')	
		.use(api)
		.use(routing)
		.listen(3000, function(){
			console.log('server listen 3000')
		})