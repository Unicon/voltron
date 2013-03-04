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
							query: {
								method: "GET",
								isArray: true,
								params: {
									id: "photos"
								}
							},
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