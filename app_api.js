var express 	= require('express'),
	compression 	= require('compression'),
	bodyParser 	= require('body-parser'),
	app  		= express(),
	route 		= express.Router(),
	locallydb 	= require('locallydb'),
	db 			= new locallydb('./.db') ;

var product = db.collection('product');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false})

// product.insert([
// 	{name: 'Frindha Pointy Glitter Heels', price : 189.000, size: [36, 37, 38, 39], image: './assets/images/product/1.jpg'},
// 	{name: 'Velicia Stripes Bodycon Midi Dress', price : 89.000, size: ['S'], image: './assets/images/product/2.jpg'},
// 	{name: 'Ferrona Plain Sporty Backpack', price : 159.000, size: [], image: './assets/images/product/3.jpg'},
// 	{name: 'Zerszina Plain Tunic Blouse', price : 109.000, size: ['L'], image: './assets/images/product/4.jpg'},
// 	{name: 'Louisfoxel Leather High Boots', price : 199.000, size: [36, 37, 38, 39], image: './assets/images/product/5.jpg'},
// 	{name: 'Fristiania Text Longsleeve Sweater', price : 109.000, size: ['XL'], image: './assets/images/product/6.jpg'},
// 	{name: 'Rhistyza Polkadot Sleeveless Shirt', price : 83.000, size: ['L'], image: './assets/images/product/7.jpg'},
// 	{name: 'Delvea Plain Pleated Midi Dress', price : 89.000, size: ['L'], image: './assets/images/product/8.jpg'},
// ])

app

.get('/api/product/get_all', urlencodedParser, function(req, res){
	res.json(product.items)
})

.get('/api/product/get/:id', function(req, res){
	res.json(product.get(parseInt(req.params.id)))
})

.delete('/api/product/delete/:id', function(req, res){
	console.log()
})

module.exports = app;