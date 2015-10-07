module.exports = function(config) {
	var sauceLabsBrowsers = require('./browsers').browsers
	var browsers = ['Chrome']
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'js/test/vendor/jquery-1.11.3.min.js',
			'js/test/**/*.js'
		],
		reporters: ['progress'],
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
		browsers: ['Chrome']
	});
};