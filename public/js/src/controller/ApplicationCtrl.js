/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'angular',
		'underscore',
		'debug',
		'directive/PreventDefault',
		'filter/Localize',
		'service/BrowserDetect'
	],
	function (app, angular, _, debug) {
		'use strict';

		/**
		The Application controller sits at the root of the application.

		@class ApplicationCtrl
		@submodule gallery-controller
		@constructor
		**/
		app.gallery.controller(
			'ApplicationCtrl',
			[
				'$scope',
				'$filter',
				'$location',
				'$log',
				'BrowserDetect',
				function ($scope, $filter, $location, $log, BrowserDetect) {

					$scope.browser = BrowserDetect;

					$scope.$on('$routeChangeSuccess', function (ev) {
						var page = $location.path();
						$scope.page = page.split('/').join(' ');
					});

				}
			]
		);
	}
);