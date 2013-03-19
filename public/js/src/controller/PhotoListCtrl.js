/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'jquery',
		'underscore',
		'angular',
		'debug',
		'resource/Photos',
		'filter/Localize'
	],
	function (app, $, _, angular, debug) {
		'use strict';

		/**
		The PhotoListCtrl is responsible for loading and displaying the photo list view.

		@class PhotoListCtrl
		@submodule gallery-controller
		@constructor
		**/
		app.gallery.controller(
			'PhotoListCtrl',
			[
				'$scope',
				'Photos',
				function ($scope, Photos) {
					/**
					List of Photo objects.

					@property photos
					@type Array
					**/
					$scope.photos = [];

					// Request photos.
					Photos.get(
						function (response) {
							$scope.photos = response.photos;
						}
					);

					/**
					Title of page.

					@property photoHeadline
					@type Array
					**/
					$scope.photoHeadline = 'List of Photos';

					/**
					Property to sort photos on.

					@property orderProp
					@type String
					@default name
					**/
					$scope.orderProp = 'name';
				}
			]
		);
	}
);