module.exports = function(config) {
	config.set({
		basePath: '',
		browsers: ['PhantomJS'],
		frameworks: ['qunit'],
		plugins: ['karma-qunit', 'karma-phantomjs-launcher'],
		singleRun: false,
		autoWatch: true,
		reporters: ['progress'],
		colors: true,
		files: [
			'js/test/test.js'
		],
	});
};