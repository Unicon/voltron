/*jshint nomen:true */
/*global requirejs:true, require:true */

// Require Configuration.
requirejs.config({
	paths: {
		baseUrl: '/js/src/',
		urlArgs: 'cb=' + Math.random(),
		// Source paths.
		src: '../src/',
		app: '../src/app',
		controller: '../src/controller/',
		directive: '../src/directive/',
		filter: '../src/filter/',
		resource: '../src/resource/',
		service: '../src/service/',
		// Third-party paths.
		debug: '../lib/debug/debug',
		jquery: '../lib/require/require-jquery',
		underscore: '../lib/underscore/underscore',
		angular: '../lib/angular/angular',
		angularResource: '../lib/angular/angular-resource',
		bootstrap: '../lib/bootstrap/js/bootstrap',
		// Test paths.
		jasmine: '../test/lib/jasmine/jasmine',
		'jasmine-html': '../test/lib/jasmine/jasmine-html',
		spec: '../test/spec/'
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
		},
		jasmine: {
			exports: 'jasmine'
		},
		'jasmine-html': {
			deps: ['jasmine'],
			exports: 'jasmine'
		}
	}
});

require(
	[
		'jquery',
		'underscore',
		'angular',
		'jasmine-html'
	],
	function ($, _, angular, jasmine) {
		var jasmineEnv, htmlReporter, specs;

		jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 1000;

		htmlReporter = new jasmine.HtmlReporter();
		jasmineEnv.addReporter(htmlReporter);

		jasmineEnv.specFilter = function(spec) {
			return htmlReporter.specFilter(spec);
		};

		// SPEC FILES.
		specs = [];
		specs.push('spec/PhotoDetailCtrl.spec');
		specs.push('spec/PhotoListCtrl.spec');

		$(function(){
			require(specs, function(){
				jasmineEnv.execute();
			});
		});

	});