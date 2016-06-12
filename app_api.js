var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	app  		= express(),
	route 		= express.Router(),
	locallydb 	= require('locallydb'),
	db 			= new locallydb('./.db'),
	crypto 		= require('crypto');

var product = db.collection('product');
var users = db.collection('users');
var cart = db.collection('cart');

function hash(password){
	return crypto.createHash('sha256').update(password).digest('hex');
}

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false})

if(product.items.length < 1){
	product.insert([
		{name: 'Frindha Pointy Glitter Heels', price : 189000, size: [36, 37, 38, 39], image: './assets/images/products/1.jpg'},
		{name: 'Velicia Stripes Bodycon Midi Dress', price : 89000, size: ['S'], image: './assets/images/products/2.jpg'},
		{name: 'Ferrona Plain Sporty Backpack', price : 159000, size: [], image: './assets/images/products/3.jpg'},
		{name: 'Zerszina Plain Tunic Blouse', price : 109000, size: ['L'], image: './assets/images/products/4.jpg'},
		{name: 'Louisfoxel Leather High Boots', price : 199000, size: [36, 37, 38, 39], image: './assets/images/products/5.jpg'},
		{name: 'Fristiania Text Longsleeve Sweater', price : 109000, size: ['XL'], image: './assets/images/products/6.jpg'},
		{name: 'Rhistyza Polkadot Sleeveless Shirt', price : 83000, size: ['L'], image: './assets/images/products/7.jpg'},
		{name: 'Delvea Plain Pleated Midi Dress', price : 89000, size: ['L'], image: './assets/images/products/8.jpg'},
	])
}

app

.get('/api/product/get_all', function(req, res){
	res.json(product.items)
})

.get('/api/product/get/:id', function(req, res){
	res.json(product.get(parseInt(req.params.id)))
})

.delete('/api/product/delete/:id', function(req, res){
	console.log()
})

.post('/api/users/add', function(req, res){
	var user = users.where({username: req.body.username}).items[0];
	
	var user = {
		username : req.body.username,
		email : req.body.email,
		password : hash(req.body.password)
	}

	users.insert(user)
	res.cookie('SS_USER_SESSION', JSON.stringify(user), { expire : new Date() + 9999 })
	res.json(user)

	
})

.post('/api/users/login', function(req, res){
	var user = users.where({username: req.body.username, password: hash(req.body.password)}).items[0];

	if(user){
		res.cookie('SS_USER_SESSION', JSON.stringify(user), { expire : new Date() + 9999 })
		res.json(user)
	}else{
		res.status(404).json({status: 404, message: 'Incorrect email or password'})
	}

})

.post('/api/cart/save', function(req, res){
	var products = product.where({cid: parseInt(req.body.product_id)}).items[0];
	products.user_id = parseInt(req.body.user_id);
	products.product_id = parseInt(req.body.product_id);


	if(cart.insert(products) > -1 ){
		res.json(products)
	}else{
		res.status(500).json({status: 500, message: 'Error save to cart'})
	}
})

.post('/api/cart/insert', function(req, res){
	if(cart.insert(req.body.data_cart) > -1){
		res.json(req.body.data_cart)
	}else{
		res.status(500).json({status: 500, message: 'Error save to cart'})
	}
})

.get('/api/cart/get/:id', function(req, res){
	var carts = cart.where({user_id: parseInt(req.params.id)}).items;

	if(carts){
		res.json(carts)
	}else{
		res.status(500).json({status: 500, message: 'Data Not Found'})
	}
})

.delete('/api/cart/delete/:id', function(req, res){
	var remove = cart.remove(req.params.id)

	if(remove == 1){
		res.json(200)
	}else{
		res.status(500).json({status: 500, message: 'Error Delete data'})
	}
})

module.exports = app;