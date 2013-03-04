/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'angular',
		'underscore',
		'debug',
		'directive/PreventDefault'
	],
	function (app, angular, _, debug) {
		'use strict';

		/**
		The Application controller sits at the root of the application.

		@class ApplicationCtrl
		@submodule controller
		@constructor
		**/
		app.gallery.controller(
			'ApplicationCtrl',
			[
				function () {}
			]
		);
	}
);