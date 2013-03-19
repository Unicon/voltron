/*jshint nomen:false */
/*global define:true, describe:true, beforeEach:true, afterEach:true, module:true it:true, expect:true, inject:true, runs:true, waitsFor:true */

define(
	[
		'app',
		'angular',
		'angularMock',
		'resource/Photo'
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

		describe('Photo resource', function () {
			// Load the gallery module.
			beforeEach(module('gallery'));

			// Mock request with $httpBackend.
			beforeEach(inject(function ($injector) {
				httpBackend = $injector.get('$httpBackend');
				requestUrl = '/api/0.1/photo/100';
				httpBackend.whenGET(requestUrl).respond(photos[0]);
			}));

			// All requests have been handled.
			afterEach(function () {
				httpBackend.verifyNoOutstandingExpectation();
				httpBackend.verifyNoOutstandingRequest();
			});

			it('should return photos with the following properties: ' + properties.toString(), inject(function ($httpBackend, Photo) {
					httpBackend.expectGET(requestUrl);
					Photo.get(
						{
							id: 100
						},
						function (data) {
							obj = data;
						}
					);
					httpBackend.flush();
					expect(JSON.stringify(obj)).toEqual(JSON.stringify(photos[0]));
				}
			));
		});
	}
);