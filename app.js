/*jshint es5:true */
/*global require:true, __dirname:true, console:true */

// Modules.
var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	nconf = require('nconf'),
	config = require('./config'),
	less = require('less-middleware'),
	hogan = require('hogan-express');

// Express configuration.
var app = express();

// All server configurations.
app.configure(function () {
	'use strict';

	// settings.
	app.set('port', nconf.get('PORT') || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.set('layout', 'layout/layout');
	app.engine('html', hogan);

	// middleware.
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(less(nconf.get('LESS_SETTINGS')));
	app.use(express.static(path.join(__dirname, 'public')));
});

// Development server configuration.
app.configure('development', function () {
	'use strict';
	app.use(express.errorHandler());
});

// Routes.
routes(app);

// Startup.
http.createServer(app).listen(app.get('port'), function () {
	'use strict';
	console.log('Express server listening on port ' + app.get('port'));
});