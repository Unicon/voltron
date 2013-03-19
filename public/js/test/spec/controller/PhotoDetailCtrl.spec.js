/*jshint nomen:false */
/*global define:true, describe:true, beforeEach:true, afterEach:true, module:true it:true, expect:true, inject:true */

define(
	[
		'angular',
		'angularMock'
	],
	function (angular) {
		'use strict';

		// Testing controllers requires the use of angular.mock.inject
		// Angular mock provides the module and inject methods used in
		// the below sample tests.
		//
		// see: http://docs.angularjs.org/api/angular.mock.inject
		describe('PhotoDetailCtrl', function () {
			// Define.
			var httpBackend, requestUrl;

			// Load the gallery module.
			beforeEach(module('gallery'));

			// Mock request with $httpBackend.
			beforeEach(inject(function ($injector) {
				httpBackend = $injector.get('$httpBackend');
				requestUrl = '/api/0.1/photo/100';

				// Backend definition common for all tests.
				httpBackend.when('GET', requestUrl)
					.respond({
						'id': '100',
						'name': 'Fish Hanging',
						'description': 'Fish captured with empty hand',
						'url': '../../img/fish_hanging.jpg',
						'category': 'animals'
					});
			}));

			// All requests have been handled.
			afterEach(function () {
				httpBackend.verifyNoOutstandingExpectation();
				httpBackend.verifyNoOutstandingRequest();
			});

			it('should define a photoId property', inject(function ($rootScope, $routeParams, Photo, $controller) {
				var scope, ctrl;

				httpBackend.expectGET(requestUrl);
				$routeParams.photoId = 100;
				scope = $rootScope.$new();
				ctrl = $controller('PhotoDetailCtrl', {
					$scope: scope,
					$routeParams: $routeParams,
					Photo: Photo
				});
				httpBackend.flush();
				expect(scope.photoId).toEqual($routeParams.photoId);
			}));
		});
	}
);