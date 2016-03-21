const USERNAME = 'whysrdemo@why.sr';
const PASSWORD = '7msqibCZoi8A';
const OUTPUT_DIR = './';
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/601.4.4 (KHTML, like Gecko) Version/9.0.3 Safari/601.4.4';
page.viewportSize = {
	width: 1680,
	height: 955
}

page.open('https://app.why.sr/login', function(stt) {
	if (stt!=='success') phantom.exit();
	page.onLoadFinished = null;
	// Signin
	page.evaluate(function(username, password) {
		jQuery('[name="email"]').val(username);
		jQuery('[name="password"]').val(password);
		jQuery('input[value="Sign in"]').click();
	}, USERNAME, PASSWORD);
	page.onLoadFinished = function(stt) {
		if (stt!=='success') phantom.exit();
		page.onLoadFinished = null;
		// Capture home page
		page.render(OUTPUT_DIR + 'home.jpg');
		page.open('https://app.why.sr/campaigns', function(stt) {
			if (stt!=='success') phantom.exit();
			page.onLoadFinished = null;
			setTimeout(function () {
				// Capture campaigns page
				page.render(OUTPUT_DIR + 'capmpaigns.jpg');
				page.open('https://app.why.sr/brands', function(stt) {
					if (stt!=='success') phantom.exit();
					page.onLoadFinished = null;
					setTimeout(function () {
						// Capture brands page
						page.render(OUTPUT_DIR + 'brands.jpg');
						page.open('https://app.why.sr/urls/basic', function(stt) {
							if (stt!=='success') phantom.exit();
							page.onLoadFinished = null;
							setTimeout(function () {
								page.render(OUTPUT_DIR + 'urls_basic.jpg');
								phantom.exit();
							}, 5000);
						});
					}, 5000);
				});
			}, 5000);
		});
	};
});
