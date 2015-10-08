module.exports = function(config) {
	var sauceLabsBrowsers = require('./browsers').browsers
	var customLaunchers = {
		/* WINDOWS BROWSERS */

		// Internet Explorer
		sl_ie8_win7: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '8',
			platform: 'windows 7'
		},

		sl_ie9_win7: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			version: '9',
			platform: 'windows 7'
		},

		sl_ie10_win8: {
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

		sl_chrome_win81: {
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'windows 8.1'
		},	

		// firefox
		sl_ie_win7: {
			base: 'SauceLabs',
			browserName: 'Firefox',
			platform: 'windows 8.1'
		},	

		/* OSX */

		sl_osx_safari: {
			base: 'SauceLabs',
			browserName: 'safari',
			platform: 'OS X 10.10'
		},

		sl_osx_chrome: {
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'OS X 10.10'
		},

		sl_osx_firefox: {
			base: 'SauceLabs',
			browserName: 'firefox',
			platform: 'OS X 10.10'
		},

		/* IPHONE */

		sl_iphone_safari: {
			base: 'SauceLabs',
			browserName: "iphone",
			platform: 'OS X 10.10',
			version: "8.2"
		},

		/* LINUX */

		sl_linux_chrome: {
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'Linux'
		},
		
		sl_linux_firefox: {
			base: 'SauceLabs',
			browserName: 'firefox',
			platform: 'Linux'
		}
	}

	config.set({
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
		customLaunchers: sauceLabsBrowsers,
		browsers: Object.keys(customLaunchers)
	});
};