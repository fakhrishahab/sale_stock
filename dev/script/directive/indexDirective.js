;'use strict';

app.directive('btnBuy', function($cookies, service){
	return {
		restrict: 'A',
		controller: function($scope, $element, $attrs){
			var cart_temp = [];

			function hash(s){
  				return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);    
			};

			$scope.doBuy = function(id){
				cart_temp = $cookies.getObject('SS_CART_TMP') || [];
				var expireDate = new Date();
  				expireDate.setDate(expireDate.getDate() + 1);
				service.getProduct(id)
					.success(function(result){
						result.item_id = hash(Date());
						// console.log(result)
						cart_temp.push(result);
						$cookies.putObject('SS_CART_TMP', cart_temp, { 'expires':expireDate});
						window.location.href="./cart";
					})
					.error(function(status){
						console.log(status);
					})
			};
		}
		
	};
});