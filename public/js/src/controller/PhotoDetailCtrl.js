/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'jquery',
		'underscore',
		'angular',
		'debug',
		'resource/Photo'
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

					// Represents specific photo data.
					$scope.photo = {};

					// Request collection of photos.
					Photo.getPhoto(
						$routeParams.photoId,
						function (data, status, headers, config) {
							$scope.photo = data;
						},
						function (data, status, headers, config) {
							$scope.photo = {};
						}
					);
				}
			]
		);

		return controller;
	}
);