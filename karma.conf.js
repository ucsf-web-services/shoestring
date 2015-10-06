module.exports = function(config) {
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
			username: 'shoestring',
		},
		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher'
		]
		//browsers: ['Chrome'],
		//frameworks: ['jasmin'],
		
	});
};