'use strict';

app.controller('cartController', function($scope, $cookies, service){

	var login_data = $cookies.getObject('SS_USER_SESSION');
	console.log(login_data)
	if(login_data){
		service.getCart(login_data.cid)
			.success(function(result){
				console.log(result)
			})
			.error(function(status) {
				console.log(status)
			});
	}
})