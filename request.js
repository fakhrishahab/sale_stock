var request 	= require('request');

var InitRequest = module.exports = {
	pickProduct : function(callback){
		request('http://localhost:3000/api/product/get/1', function(err, res, body){
			callback(null, body)
		})
	},

	getProduct : function(callback){
		request('http://localhost:3000/api/product/get_all', function(err, res, body){
			callback(null, body)
		})
	},

	insertUser: function(callback){
		request('http://localhost:3000/api/users/add', function(err, res, body){
			callback(null, body)
		})
	}
}