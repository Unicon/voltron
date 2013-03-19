/*jshint nomen:false */
/*global define:true, describe:true, beforeEach:true, module:true it:true, expect:true, inject:true, runs:true, waitsFor:true */

define(
	[
		'angular',
		'angularMock',
		'service/BrowserDetect'
	],
	function (angular) {
		'use strict';

		describe('Browser detection service', function () {

			// Load the gallery module.
			beforeEach(module('gallery'));

			it('should return an object with the user\'s Browser Name', inject(function (BrowserDetect) {
				expect(BrowserDetect.browser).toBeDefined();
			}));

			it('should return an object with the user\'s Browser Version', inject(function (BrowserDetect) {
				expect(BrowserDetect.version).toBeDefined();
			}));

			it('should return an object with the user\'s Operating System', inject(function (BrowserDetect) {
				expect(BrowserDetect.OS).toBeDefined();
			}));

		});
	}
);