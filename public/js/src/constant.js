/*jslint nomen: true, plusplus: true */
/*global angular:true, define:true */

'use strict';

define(
	[
		'app'
	],
	function (app) {
		app.gallery
			.constant(
				'API_BASE',
				'/data'
			);

	}
);


