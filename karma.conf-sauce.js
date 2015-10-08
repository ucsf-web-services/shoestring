module.exports = function(config) {
	var sauceLabsBrowsers = require('./browsers.json').browsers
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
		browsers: Object.keys(sauceLabsBrowsers)
	});
};