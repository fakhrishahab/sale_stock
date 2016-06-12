;'use strict';

app.controller('cartController', function($scope, $cookies, service){
	var self = this;

	self.cartItems = $cookies.getObject('SS_CART_TMP') || [];
	// self.cartTemp = $cookies.getObject('SS_CART_TMP');
	self.totalPrice = 0;
	self.doDeleteCart = doDeleteCart;
	self.doCheckout = doCheckout;

	var login_data = $cookies.getObject('SS_USER_SESSION');
	var cart_data;

	// function getCartList(){
	// 	if(login_data){
	// 		service.getCart(login_data.cid)
	// 			.success(function(result){
	// 				self.cartItems = [].concat(result)						
	// 			})
	// 			.error(function(status) {
	// 				console.log(status)
	// 			});
	// 	}else{
	// 		// var cart_data = $cookies.getObject('SS_CART_TMP')
	// 		self.cartItems = [].concat(self.cartTemp)
	// 	}

	Object.keys(self.cartItems).forEach(function(key){
		self.totalPrice += self.cartItems[key].price;
	});
	// }
	// getCartList()
	

	function doDeleteCart(id){
		// if(login_data){
		// 	service.deleteCart(id)
		// 		.success(function(result){
		// 			console.log(result)
		// 		})
		// 		.error(function(status){
		// 			console.log(status)
		// 		})
		// }else{
			var index = _.findIndex(self.cartItems, {item_id : id});
			self.cartItems.splice(index, 1);

			$cookies.putObject('SS_CART_TMP', self.cartItems);
		// }

	};

	function doCheckout(){
		if(!login_data){
			alert('You have to login first');
			$scope.triggerLogin();
		}else{
			Object.keys(self.cartItems).forEach(function(key){
				delete self.cartItems[key].cid;
			});
			service.insertCart(self.cartItems)
				.success(function(result){
					console.log(result);
				})
				.error(function(status){
					console.log(status);
				})
			// console.log(self.cartItems)
			// service.insertCart(self.ca)
		};
	};

});