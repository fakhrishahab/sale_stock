'use strict';

app.directive('btnBuy', function($cookies, service){
	return {
		restrict: 'A',
		link: function($scope, elm, attrs, controller){
			elm.bind('click', function(){
				if($cookies.getObject('SS_USER_SESSION')){
					
					service.saveCart(attrs.productId, $cookies.getObject('SS_USER_SESSION').cid)
						.success(function(result){
							window.location.href='./cart';
						})
						.error(function(status) {
							console.log(status)
						});
				}else{
					var expireDate = new Date();
  					expireDate.setDate(expireDate.getDate() + 1);

					service.getProduct(attrs.productId)
						.success(function(result){
							$cookies.putObject('SS_CART_TMP', result, { 'expires':expireDate})
							window.location.href="./cart";
						})
						.error(function(status){
							console.log(status)
						})
					// console.log(attrs)
				}
				// console.log(window.SS_USER_SESSION)
			})
		}
	}
})