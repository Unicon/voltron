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

		app.gallery.controller(
			'PhotoListCtrl',
			[
				'$scope',
				'Photo',
				function ($scope, Photo) {
					// Request collection of photos.
					$scope.photos = Photo.query();

					// Headlines.
					$scope.photoHeadline = 'List of Photos';

					// Default order.
					$scope.orderProp = 'name';


				}
			]
		);
	}
);