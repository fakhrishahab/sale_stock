;'use strict';

app
.directive('btnLogin', function(){
	// Runs during compile
	return {
		restrict : 'A',
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		scope : '=',
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, elm, iAttrs, controller){
			// $scope.formLogin = function(elm){
			// 	console.log(elm)
			// }
			$scope.triggerLogin = function(test){
				document.querySelector('.float-form-header').classList.add("slideDown")	;
				$('.float-form-header').animate({
					height: $('#login-form').height()
				}, 400);
				$('.float-form-header').animate({
		 			scrollTop : $('#login-form').offset().top + 62
		 		}, 400, function(){

		 		});
			};

			var active;

			elm.bind('click',function(){
				$('.float-form-header').animate({
					height: $(iAttrs.target).height()
				}, 400);
				var formOpened = document.querySelector('.float-form-header').classList.contains('slideDown');
				if(formOpened == false){
				 	document.querySelector('.float-form-header').classList.add("slideDown")	;
					window.location.href = iAttrs.target;
				}else{
					// if(active == iAttrs.target){
					// 	var classClose = document.querySelector('.float-form-header').className.replace(/\bslideDown\b/ , '')
					// 	document.querySelector('.float-form-header').className = classClose;
					// }else{
						if(iAttrs.target !== ''){
							// console.log($(hash).height())
							active = iAttrs.target;
					 		var hash = iAttrs.target;
					 		$('.float-form-header').animate({
					 			scrollTop : $(hash).offset().top + 62,
					 			height: $(hash).height()
					 		}, 400, function(){

					 		});
					 	};
					// }
			    };
			 
			 	
			});
		}
	};
})

.directive('closeForm', function(){
	return {
		restrict: 'A',
		link: function($scope, elm, attr, controller){
			elm.bind('click', function(){
				var classClose = document.querySelector('.float-form-header').className.replace(/\bslideDown\b/ , '');
				document.querySelector('.float-form-header').className = classClose;
			});
		}
	};
})

.directive('elmFocus', function(){
	return {
		restrict : 'A',
		link: function($scope, elm, attrs, controller){
			var parent, icon;
			// console.log(elm.hasFocus())
			elm.bind('focus', function(){
				parent = this.parentElement;
				icon = this.previousSibling.previousSibling;
				icon.classList.add('focus');
				parent.classList.add('focus');
			});

			elm.bind('blur', function(){
				var noFocus = this.parentElement.className.replace(/\bfocus\b/, '');
				var noFocusIcon = this.previousSibling.previousSibling.className.replace(/\bfocus\b/, '');
				parent.className = noFocus;
				icon.className = noFocusIcon;
			});
		}
	};
})

.directive('btnRegister', function(service){
	return {
		restrict: 'A',
		link: function($scope, elm, attrs, controller){
			elm.bind('click', function(){
				var data = {
					username : $scope.register_username,
					email : $scope.register_email,
					password : $scope.register_password
				};

				service.addUser(data)
					.success(function(res){
						document.location.reload(true);
					})
					.error(function() {
						console.log('error');
					})

				// console.log($scope.register_username)
			});
		}
	};
})

.directive('btnDoLogin', function(service){
	return {
		restrict: 'A',
		link: function($scope, elm, attrs, controler){
			elm.bind('click', function(){
				var data = {
					username : $scope.login_username,
					password : $scope.login_password
				};

				service.userLogin(data)
					.success(function(result){
						console.log(result);
						// window.location.href="./"
						document.location.reload(true);
					})
					.error(function(){
						console.log('error');
					})
			});
		}
	};
})