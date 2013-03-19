/*global define:true */

define(
	[
		'app',
		'angular'
	],
	function (app) {
		'use strict';

		/**
		Returns a Photos $resource object.
		Used to GET a list of photos from the Photos API.

		@class Photos
		@submodule resource
		@constructor
		*/
		app.gallery.factory(
			'Photos',
			[
				'$resource',
				'API_BASE',
				function ($resource, API_BASE) {
					return $resource(
						API_BASE + '/photos:id'
					);
				}
			]
		);
	}
);