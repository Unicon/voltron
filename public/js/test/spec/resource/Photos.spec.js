/*jshint nomen:false */
/*global define:true, describe:true, beforeEach:true, afterEach:true, module:true it:true, expect:true, inject:true, runs:true, waitsFor:true */

define(
	[
		'app',
		'angular',
		'angularMock',
		'resource/Photos'
	],
	function (app, angular) {
		'use strict';

		// Define.
		var properties = ['name', 'description', 'url', 'category'],
			photos = [
				{
					'id': '100',
					'name': 'Fish Hanging',
					'description': 'Fish captured with empty hand',
					'url': '../../img/fish_hanging.jpg',
					'category': 'animals'
				}
			],
			list,
			obj,
			requestUrl,
			httpBackend;

		describe('Photos resource', function () {
			// Load the gallery module.
			beforeEach(module('gallery'));

			// Mock request with $httpBackend.
			beforeEach(inject(function ($injector) {
				httpBackend = $injector.get('$httpBackend');
				requestUrl = '/api/0.1/photos';
				httpBackend.whenGET(requestUrl).respond(photos);
			}));

			// All requests have been handled.
			afterEach(function () {
				httpBackend.verifyNoOutstandingExpectation();
				httpBackend.verifyNoOutstandingRequest();
			});

			it('should get a list of photos', inject(function ($httpBackend, Photos) {
					httpBackend.expectGET(requestUrl);
					Photos.query(
						function (response) {
							list = response;
						}
					);
					httpBackend.flush();
					expect(JSON.stringify(list)).toEqual(JSON.stringify(photos));
				}
			));

		});
	}
);