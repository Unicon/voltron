/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'jquery',
		'underscore',
		'angular',
		'debug',
		'resource/Photo',
		'filter/Localize'
	],
	function (app, $, _, angular, debug) {
		'use strict';

		var controller = app.gallery.controller(
			'PhotoDetailCtrl',
			[
				'$scope',
				'$routeParams',
				'Photo',
				function ($scope, $routeParams, Photo) {
					// Capture photo id from route.
					$scope.photoId = $routeParams.photoId;

					// Request photo data.
					$scope.photo = Photo.get({id: $scope.photoId});
				}
			]
		);

		return controller;
	}
);