/**
Simple catch all route implementation.

@param {Object} app Express application instance.
**/
module.exports = function (app) {
	// Catch all response.
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
};