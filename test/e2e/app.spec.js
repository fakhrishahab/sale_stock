describe('end to end homepage test', function(){
	beforeEach(function(){
		browser.get('http://localhost:3000');
	});

	it('Should have 8 product', function(){
		expect(element.all(by.repeater('product in ic.productHome')).count()).toEqual(8);
	});

	it("Should Open the register form and Do Register Function", function(){
		var username = "Whatever";
		var email 	 = "whatever@gmail.com";
		var password = "12345";
		var retype_password = "12345";

		element(by.css('.showRegister')).click()
		element(by.model('register_username')).sendKeys(username);
		element(by.model('register_email')).sendKeys(email);
		element(by.model('register_password')).sendKeys(password);
		element(by.model('register_repassword')).sendKeys(retype_password);
		element(by.css('.doRegister')).click();
		expect(element(by.id('user-login')).getText()).toEqual(username);
	})

	it("Should Open the login Form and Do Login Function", function(){
		browser.waitForAngular();

     	browser.actions().mouseMove(element(by.css('.user-trigger-wrapper'))).perform();
		element(by.id('btnLogout')).click();
		browser.waitForAngular();

		var user_login = 'farwah';
		element(by.css('.showLogin')).click();
		element(by.model('login_username')).sendKeys(user_login);
		element(by.model('login_password')).sendKeys('12345');
		element(by.css('.doLogin')).click();
		expect(element(by.id('user-login')).getText()).toEqual(user_login);
	});

	it("Should add cookies when klik button BUY", function(){
		element(by.id('btnBuy')).click();
		browser.manage().getCookie('SS_CART_TMP')
                .then(function (cookie) {
                	expect(cookie).not.toBe(null);
                });
	});

	it("Should redirect to the cart page", function(){
		element(by.id('cart-icon')).click();
		browser.waitForAngular();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/cart');
	});

})