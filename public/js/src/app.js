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