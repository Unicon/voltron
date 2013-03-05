/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'jquery',
		'underscore',
		'angular',
		'debug',
		'angularResource',
		'constant'
	],
	function (app, $, _, angular, debug) {
		'use strict';

		/**
		The Photo resource handles AJAX requests to the server for photo data.

		@class Photo
		@submodule gallery-resource
		@constructor
		**/
		var resource = app.gallery.factory(
			'Photo',
			[
				'$resource',
				'API_BASE',
				function ($resource, API_BASE) {
					return $resource(
						API_BASE + '/:id.json',
						{
							id: "@id"
						},
						{
							/**
							Query returns a list of photos from the server based on pre-defined parameters.

							@method query
							@returns Array
							**/
							query: {
								method: "GET",
								isArray: true,
								params: {
									id: "photos"
								}
							},

							/**
							Update issues a PUT request to the server to update a photo resource.

							@method update
							@param {Number} id ID of photo resource.
							@param {Object} data JavaScript Hash of photo properties to be saved.
							@returns Object
							**/
							update: {
								method: "PUT"
							}
						}
					);
				}
			]);

		return resource;
	}
);