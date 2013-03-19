/*global exports:true, module:true, require:true */

// Simple catch all route implementation.
module.exports = function (app) {
	var index = function (req, res) {
		res.render('index', {
			title: 'Angular with Require || Gallery',
			locale: 'en-us',
			dev: true
		});
	};

	// Routes.
	app.get('/', index);
	app.get('/home', index);
	app.get('/photos', index);
	app.get('/photos/*', index);
};