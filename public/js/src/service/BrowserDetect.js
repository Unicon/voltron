/*jshint nomen:false */
/*global define:true, navigator:true */

define(
	[
		'app',
		'underscore',
		'filter/Localize'
	],
	function (app, _) {
		'use strict';

		/**
		Utilizes code from: http://www.quirksmode.org/js/detect.html

		@class BrowserDetect
		@submodule gallery-service
		@constructor
		**/
		app.gallery.service(
			'BrowserDetect',
			[
				'$window',
				'$filter',
				function ($window, $filter) {
					var versionSearchString, dataBrowser, dataOS, browser, version, OS, BrowserDetect = {};

					/**
					Searches data for correct browser or OS.

					@method searchString
					@param {String} data Input to search for.
					@private
					**/
					function searchString(data) {
						var i = 0,
							l = data.length;

						for (i; i < l; i++)	{
							var dataString = data[i].string;
							var dataProp = data[i].prop;
							versionSearchString = data[i].versionSearch || data[i].identity;
							if (dataString) {
								if (dataString.indexOf(data[i].subString) !== -1) {
									return data[i].identity;
								}
							} else if (dataProp) {
								return data[i].identity;
							}
						}
					}

					/**
					Searches data for correct browser version.

					@method searchVersion
					@param {String} dataString Input to search for.
					@private
					**/
					function searchVersion(dataString) {
						var index = dataString.indexOf(versionSearchString);
						if (index === -1) { return; }
						return parseFloat(dataString.substring(index + versionSearchString.length + 1));
					}

					// Browser object.
					dataBrowser = [
						{
							string: navigator.userAgent,
							subString: 'Chrome',
							identity: 'Chrome'
						},
						{
							string: navigator.userAgent,
							subString: 'OmniWeb',
							versionSearch: 'OmniWeb/',
							identity: 'OmniWeb'
						},
						{
							string: navigator.vendor,
							subString: 'Apple',
							identity: 'Safari',
							versionSearch: 'Version'
						},
						{
							prop: $window.opera,
							identity: 'Opera',
							versionSearch: 'Version'
						},
						{
							string: navigator.vendor,
							subString: 'iCab',
							identity: 'iCab'
						},
						{
							string: navigator.vendor,
							subString: 'KDE',
							identity: 'Konqueror'
						},
						{
							string: navigator.userAgent,
							subString: 'Firefox',
							identity: 'Firefox'
						},
						{
							string: navigator.vendor,
							subString: 'Camino',
							identity: 'Camino'
						},
						{		// for newer Netscapes (6+)
							string: navigator.userAgent,
							subString: 'Netscape',
							identity: 'Netscape'
						},
						{
							string: navigator.userAgent,
							subString: 'MSIE',
							identity: 'Explorer',
							versionSearch: 'MSIE'
						},
						{
							string: navigator.userAgent,
							subString: 'Gecko',
							identity: 'Mozilla',
							versionSearch: 'rv'
						},
						{
							// for older Netscapes (4-)
							string: navigator.userAgent,
							subString: 'Mozilla',
							identity: 'Netscape',
							versionSearch: 'Mozilla'
						}
					];

					// OS object.
					dataOS = [
						{
							string: navigator.platform,
							subString: 'Win',
							identity: 'Windows'
						},
						{
							string: navigator.platform,
							subString: 'Mac',
							identity: 'Mac'
						},
						{
							string: navigator.userAgent,
							subString: 'iPhone',
							identity: 'iPhone/iPod'
						},
						{
							string: navigator.platform,
							subString: 'Linux',
							identity: 'Linux'
						}
					];

					/**
					String representing the name of the Browser detected

					@property browser
					@type String
					**/
					BrowserDetect.browser = searchString(dataBrowser) || 'An unknown browser';

					/**
					String representing the name of the Version of the Browser detected

					@property version
					@type String
					**/
					BrowserDetect.version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || 'an unknown version';

					/**
					String representing the name of the Operating System detected

					@property OS
					@type String
					**/
					BrowserDetect.OS = searchString(dataOS) || 'an unknown OS';

					return BrowserDetect;
				}
			]
		);
	}
);