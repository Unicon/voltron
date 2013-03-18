/*jslint nomen: true, plusplus: true */
/*global angular:true, define:true */

define(
	[
		'app'
	],
	function (app) {

		'use strict';

		app.gallery
			.constant(
				'API_BASE',
				'/data'
			);

	}
);


