/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'jquery',
		'underscore',
		'angular',
		'debug'
	],
	function (app, $, _, angular, debug) {
		'use strict';

		var resource = app.gallery.factory(
			'Photo',
			[
				'$http',
				function ($http) {
					var photo = {
						getPhotos: function (success, error) {
							$http({method: 'GET', url: 'data/photos.json'})
								.success(success)
								.error(error);
						},

						getPhoto: function (id, success, error) {
							$http({method: 'GET', url: 'data/' + id + '.json'})
								.success(success)
								.error(error);
						}
					};

					return photo;
				}
			]);

		return resource;
	}
);