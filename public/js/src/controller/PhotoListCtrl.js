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

		app.gallery.controller(
			'PhotoListCtrl',
			[
				'$scope',
				'Photo',
				function ($scope, Photo) {
					// Collection of photos.
					$scope.photos = [];

					// Headlines.
					$scope.photoHeadline = 'List of Photos';

					// Default order.
					$scope.orderProp = 'name';

					// Request collection of photos.
					Photo.getPhotos(
						function (data, status, headers, config) {
							$scope.photos = data;
						},
						function (data, status, headers, config) {
							$scope.photos = [];
						}
					);
				}
			]
		);
	}
);