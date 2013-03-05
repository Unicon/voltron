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
		The PhotoListCtrl is responsible for loading and displaying the photo list view.

		@class PhotoListCtrl
		@submodule gallery-controller
		@constructor
		**/
		app.gallery.controller(
			'PhotoListCtrl',
			[
				'$scope',
				'Photo',
				function ($scope, Photo) {
					/**
					List of Photo objects

					@property photos
					@type Array
					**/
					$scope.photos = Photo.query();

					/**
					Title of page

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