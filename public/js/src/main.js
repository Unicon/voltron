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
		angularLocale: '../lib/angular/i18n/angular-locale_en-us',
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
		'angularLocale': {
			deps: ['angular'],
			exports: 'angularLocale'
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
		'constant',
		'router'
	],
	function (app) {
		'use strict';
		app.init();
	}
);