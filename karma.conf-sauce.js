module.exports = function(config) {
	var sauceLabsBrowsers = require('./browsers').browsers
	var browsers = [
	
		/* WINDOWS BROWSERS */

		// Internet Explorer
		{
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '8',
			platform: 'windows 7'
		},

		{
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '9',
			platform: 'windows 7'
		},

		{
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '10',
			platform: 'windows 8'
		},

		{
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '11',
			platform: 'windows 8.1'
		},

		// chrome

		{
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'windows 8.1'
		},	

		// firefox
		{
			base: 'SauceLabs',
			browserName: 'Firefox',
			platform: 'windows 8.1'
		},	

		/* OSX */

		{
			base: 'SauceLabs',
			browserName: 'safari',
			platform: 'OS X 10.10'
		},

		{
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'OS X 10.10'
		},

		{
			base: 'SauceLabs',
			browserName: 'firefox',
			platform: 'OS X 10.10'
		},

		/* IPHONE */

		{
			base: 'SauceLabs',
			browserName: "iphone",
			platform: 'OS X 10.10',
			version: "8.2"
		},

		/* LINUX */

		{
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'Linux'
		},
		
		{
			base: 'SauceLabs',
			browserName: 'firefox',
			platform: 'Linux'
		},
	]
	
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'js/test/vendor/jquery-1.11.3.min.js',
			'js/test/**/*.js'
		],
		reporters: ['progress', 'saucelabs'],
		colors: true,
		sauceLabs: {
			build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
      		tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      		startConnect: true,
      		recordVideo: false,
      		recordScreenshots: false
		},
		plugins: [	
			'karma-jasmine',
			'karma-chrome-launcher'
		],
		customLaunchers: sauceLabsBrowsers,
		browsers: Object.keys(browsers)
	});
};