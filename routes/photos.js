/*global exports:true, module:true, require:true */

// Modules.
var fs = require('fs');

// Manages photo routes.
module.exports = function (app) {

	// Retrieves all photos for the current user.
	app.get('/api/0.1/photos', function (req, res) {
		var path = __dirname + '/api/photos.json';

		// Read static file from system.
		fs.readFile(path, function (err, data) {
			if (err) {
				throw new Error('Could not read file from path. ', err);
			}

			res.json({photos: JSON.parse(data)});
		});
	});

	// Retrieves a single photo for the current user.
	app.get('/api/0.1/photo/:id', function (req, res) {
		var path = __dirname + '/api/' + req.params.id + '.json';

		// Read static file from system.
		fs.readFile(path, function (err, data) {
			if (err) {
				throw new Error('Could not read file from path. ', err);
			}

			res.json({photo: JSON.parse(data)});
		});
	});
};