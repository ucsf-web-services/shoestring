// module.exports = function(config) {
// 	var sauceLabsBrowsers = require('./browsers.json').browsers
// 	config.set({
// 		frameworks: ['jasmine'],
// 		files: [
// 			'js/test/vendor/jquery-1.11.3.min.js',
// 			'js/test/**/*.js'
// 		],
// 		reporters: ['progress', 'saucelabs'],
// 		colors: true,
// 		sauceLabs: {
// 			build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
//       		tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
//       		startConnect: true,
//       		recordVideo: false,
//       		recordScreenshots: false
// 		},
// 		customLaunchers: sauceLabsBrowsers,
// 		browsers: Object.keys(sauceLabsBrowsers)
// 	});
// };
var fs = require('fs');
module.exports = function(config) {
	var username = args.username || config.username || process.env.SAUCE_USERNAME;
  	var accessKey = args.accessKey || config.accessKey || process.env.SAUCE_ACCESS_KEY;
	var customLaunchers = {
	
		/* WINDOWS BROWSERS */

		// Internet Explorer
		sl_ie8_win7: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '8',
			platform: 'windows 7'
		},

		sl_ie8_win7:{
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '9',
			platform: 'windows 7'
		},

		sl_ie10_win8:{
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '10',
			platform: 'windows 8'
		},

		sl_ie11_win81: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '11',
			platform: 'windows 8.1'
		},

		// chrome

		sl_chrome_win81:{
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'windows 8.1'
		},	

		// firefox
		sl_firefox_win81:{
			base: 'SauceLabs',
			browserName: 'Firefox',
			platform: 'windows 8.1'
		},	

		/* OSX */

		sl_safari_osx:{
			base: 'SauceLabs',
			browserName: 'safari',
			platform: 'OS X 10.10'
		},

		sl_chrome_osx: {
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'OS X 10.10'
		},

		sl_firefox_osx: {
			base: 'SauceLabs',
			browserName: 'firefox',
			platform: 'OS X 10.10'
		},

		/* IPHONE */

		sl_iphone_osx: {
			base: 'SauceLabs',
			browserName: "iphone",
			platform: 'OS X 10.10',
			version: "8.2"
		},

		/* LINUX */

		sl_chrome_linux:{
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'Linux'
		},
		
		sl_firefox_linux: {
			base: 'SauceLabs',
			browserName: 'firefox',
			platform: 'Linux'
		}
	};
	config.set({
		basePath: '',
		username: username,
		accessKey: accessKey,
		frameworks: ['qunit'],
		files: [
			'js/test/test.js'
		],
		plugins: ['karma-qunit', 'karma-phantomjs-launcher', 'karma-sauce-launcher'],
		sauceLabs: {
			// username: process.env.SAUCE_USER,
	  //     	accessKey: process.env.SAUCE_ACCESS_KEY,
			build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
	  		tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
	  		testName: "Shoestring Tests",
	  		startConnect: false,
	  		recordVideo: false,
	  		recordScreenshots: false
		},
		browsers: Object.keys(customLaunchers),
		customLaunchers: customLaunchers,
		reporters: ['dots', 'saucelabs'],
		singleRun: true,
		logLevel: 'LOG_INFO'
	});
};