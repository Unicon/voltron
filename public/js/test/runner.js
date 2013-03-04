/*jshint nomen:true */
/*global requirejs:true, require:true, jasmine:true */

// Require Configuration.
requirejs.config({
	urlArgs: 'cb=' + Math.random(),
	baseUrl: '/js/src/',
	paths: {
		spec: '../test/spec',
		debug: '../lib/debug/debug',
		jquery: '../lib/require/require-jquery',
		underscore: '../lib/underscore/underscore',
		angular: '../lib/angular/angular',
		angularResource: '../lib/angular/angular-resource',
		angularMock: '../lib/angular/angular-mock',
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
		'angularMock': {
			deps: ['angular'],
			exports: 'angularMock'
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
		'jquery',
		'spec/index',
		'router'
	],
	function (app, $, index) {
		'use strict';

		// Initialize application.
		app.init();

		// Initialize jasmine.
		var jasmineEnv, htmlReporter;

		jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 1000;

		htmlReporter = new jasmine.HtmlReporter();
		jasmineEnv.addReporter(htmlReporter);

		jasmineEnv.specFilter = function (spec) {
			return htmlReporter.specFilter(spec);
		};

		// Execute specs.
		$(function () {
			require(index.specs, function () {
				jasmineEnv.execute();
			});
		});
	}
);