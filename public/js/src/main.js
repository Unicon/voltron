/*jshint nomen:true */
/*global requirejs:true, require:true */

// Require Configuration.
requirejs.config({
	paths: {
		debug: '../lib/debug/debug',
		jquery: '../lib/require/require-jquery',
		underscore: '../lib/underscore/underscore',
		angular: '../lib/angular/angular',
		angularResource: '../lib/angular/angular-resource',
		bootstrap: '../lib/bootstrap/js/bootstrap'
	},
	shim: {
		'debug': {
			deps: [],
			exports: 'debug'
		},
		'underscore': {
			deps: [],
			exports: '_',
			init: function () {
				'use strict';
				return this._.noConflict();
			}
		},
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angularResource': {
			deps: ['angular'],
			exports: 'angularResource'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		}
	}
});

require(
	[
		'app',
		'debug',
		'router'
	],
	function (app) {
		'use strict';
		app.init();
	}
);