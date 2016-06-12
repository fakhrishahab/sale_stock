'use strict';

app.service('service', function($http, $q){
	return {
		userLogin: function(data){
			var login = {
				url: 'http://localhost:3000/api/users/login',
				method: 'POST',
				data : data
			};

			return $http(login);
		},

		addUser: function(data){
			var user = {
				url: 'http://localhost:3000/api/users/add',
				method: 'POST',
				data : data
			};

			return $http(user);
		},

		getProduct: function(id){
			return $http.get('http://localhost:3000/api/product/get/'+id);
		},

		saveCart: function(product_id, user_id){
			var data = {
				url: 'http://localhost:3000/api/cart/save',
				method: 'POST',
				data: {
					product_id : parseInt(product_id),
					user_id : parseInt(user_id)
				}
			};

			return $http(data);
		},


		getCart: function(user_id){
			return $http.get('http://localhost:3000/api/cart/get/'+user_id);
		},

		deleteCart: function(id){
			return $http.delete('http://localhost:3000/api/cart/delete/'+id);
		},

		insertCart: function(cart){
			var insert = {
				url: 'http://localhost:3000/api/cart/insert',
				method: 'POST',
				data : {
					data_cart : cart
				}
			};

			return $http(insert);
		}
	}
});