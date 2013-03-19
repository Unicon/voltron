/*jshint nomen:false */
/*global define:true, describe:true, beforeEach:true, module:true it:true, expect:true, inject:true, runs:true, waitsFor:true */

define(
	[
		'app',
		'angular',
		'angularMock',
		'underscore'
	],
	function (app, angular, mock, _) {
		'use strict';

		// Define.
		var dictionary = {'one': 'uno'},
			list, obj, localize;

		describe('Localize filter', function () {

			// Load gallery module.
			beforeEach(module('gallery'));

			// Mock request.
			beforeEach(inject(function ($filter, $httpBackend) {
				$httpBackend.whenGET('i18n/en-us.json').respond(dictionary);

				localize = $filter('localize');
				$httpBackend.flush();
			}));

			it('should translate a string of text when available in the dictionary provided', inject(function ($filter, $httpBackend) {
				expect(localize('one')).toEqual(dictionary.one);
			}));

		});
	}
);