/*jslint nomen: true, plusplus: true */
/*global angular:true, define:true */

define(
	[
		'app'
	],
	function (app) {

		'use strict';

		/**
		Defines base url for resources.

		@attribute API_BASE
		@readOnly
		@default '/api/0.1'
		@type String
		**/
		app.gallery.constant('API_BASE', '/api/0.1');
	}
);


