/*jshint nomen:false */
/*global define:true, document:true */

define(
	[
		'debug',
		'jquery',
		'underscore',
		'angular',
		'angularResource'
	],
	function (debug, $, _, angular) {
		'use strict';

		/**
		The gallery module is the application level module for the gallery application.
		It provides initial wiring information to the angular injector.

		@module gallery
		**/

		/**
		Organizes angular controllers into a single group.

		@module gallery
		@submodule gallery-controller
		**/

		/**
		Organizes angular directives into a single group.

		The classes in this module each define a single method
		used as an Angular.js directive. The class defines directive
		dependencies, while the method defines element attributes as params

		@module gallery
		@submodule gallery-directive
		**/

		/**
		Organizes angular services into a single group.

		@module gallery
		@submodule gallery-service
		**/

		/**
		Organizes angular filters into a single group.

		@module gallery
		@submodule gallery-filter
		**/

		/**
		Organizes angular resources into a single group. Specific to Angular.js $resource services.

		@module gallery
		@submodule gallery-resource
		**/

		var app = {

			/**
			Reference to angular gallery module.

			@property gallery
			@type Object
			**/
			gallery: angular.module('gallery', ['ngResource']),

			/**
			Entry point for the gallery. Manually starts the angular
			bootstrap process and sets the debug level.

			@method init
			**/
			init: function () {
				angular.bootstrap(document, ['gallery']);
				debug.info('Angular Bootstrapped.');
			}
		};

		return app;
	}
);