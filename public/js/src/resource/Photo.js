/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'angular',
		'constant'
	],
	function (app, angular) {
		'use strict';

		/**
		The Photo resource handles AJAX requests to the server for photo data.

		@class Photo
		@submodule gallery-resource
		@constructor
		**/
		app.gallery.factory(
			'Photo',
			[
				'$resource',
				'API_BASE',
				function ($resource, API_BASE) {
					return $resource(
						API_BASE + '/photo/:id',
						{
							id: '@id'
						}
					);
				}
			]
		);
	}
);