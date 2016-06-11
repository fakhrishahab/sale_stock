var express = require('express'),
	route	= express.Router(),
	bodyParser 	= require('body-parser'),
	minify 	= require('express-minify'),
	api 	= require('./app_api'),
	cookies = require('cookie-parser'),
	routing = require('./app_routing');

var server = module.exports = 

	express()
		.set('view engine', 'ejs')
		.use(express.static('./dist'))
		.set('views', './dist/view')	
		.use(bodyParser.urlencoded({'extended' : false}))
		.use(bodyParser.json())
		.use(cookies())
		.use(api)
		.use(routing)
		.listen(3000, function(){
			console.log('server listen 3000')
		})