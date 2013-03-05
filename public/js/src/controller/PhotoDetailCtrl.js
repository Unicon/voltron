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

		/**
		The PhotoDetailCtrl is responsible for loading and displaying the photo detail view for a selected photo.

		@class PhotoDetailCtrl
		@submodule gallery-controller
		@constructor
		**/
		var controller = app.gallery.controller(
			'PhotoDetailCtrl',
			[
				'$scope',
				'$routeParams',
				'Photo',
				function ($scope, $routeParams, Photo) {

					/**
					Capture photo id from route.

					@property photoId
					@type String/Number
					**/
					$scope.photoId = $routeParams.photoId;

					/**
					Photo object loaded from server.

					@property photo
					@type Object
					**/
					$scope.photo = Photo.get({id: $scope.photoId});
				}
			]
		);

		return controller;
	}
);