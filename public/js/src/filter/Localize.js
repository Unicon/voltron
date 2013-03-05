/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'debug',
		'angularResource'
	],
	function (app, debug) {
		'use strict';

		/**
		Filter which checks a localization dictionary and returns translated string.

		@class Localize
		@submodule gallery-filter
		@constructor
		@requires $locale, $resource
		*/
		app.gallery.filter(
			'localize',
			[
				'$resource',
				'$locale',
				function ($resource, $locale) {
					/**
					@method localize
					@param {String} input String to translate
					@returns {String} Translated string if found in dictionary, input string if not found in dictionary
					@example
						{{ "foobar" | localize }} will return "foobar"
					*/
					var locale, TranslationMap, map, loaded;
					locale = $locale.id;
					TranslationMap = $resource('i18n/:locale.json', {
						"locale": "@locale"
					});
					map = TranslationMap.get({locale: locale}, function () {
						loaded = true;
					});
					loaded = false;

					return function (input) {

						//debug.info(input, map);

						if (!loaded) {
							return input;
						}
						if (!input) {
							return "";
						}
						if (!map[input]) {
							debug.warn("No localization data for \"" + input + "\" in " + locale);
						}
						return map[input] || input;
					};
				}
			]
		);
	}
);