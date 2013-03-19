/*jshint nomen:false */
/*global define:true, describe:true, beforeEach:true, module:true it:true, expect:true, inject:true */

define(
	[
		'angular',
		'angularMock'
	],
	function (angular) {
		'use strict';

		// Testing controllers requires the use of angular.mock.inject.
		// Angular mock provides the module and inject methods used in
		// the below sample tests.
		//
		// see: http://docs.angularjs.org/api/angular.mock.inject
		describe('PhotoListCtrl', function () {
			// Define.
			var httpBackend, requestUrl;

			// Load modules that need to be tested.
			beforeEach(module('gallery'));

			// Mock request with $httpBackend.
			beforeEach(inject(function ($injector) {
				httpBackend = $injector.get('$httpBackend');
				requestUrl = '/api/0.1/photos';

				// Backend definition common for all tests
				httpBackend.when('GET', requestUrl)
					.respond(
						{
							"id": "100",
							"name": "Fish Hanging",
							"description": "Fish captured with empty hand",
							"url": "../../img/fish_hanging.jpg",
							"category": "animals"
						}
					);
			}));

			// All requests have been handled.
			afterEach(function() {
				httpBackend.verifyNoOutstandingExpectation();
				httpBackend.verifyNoOutstandingRequest();
			});

			it('should define a photoHeadline property', inject(function ($rootScope, Photos, $controller) {
				// Define.
				var scope, ctrl;

				httpBackend.expectGET(requestUrl);
				scope = $rootScope.$new();
				ctrl = $controller('PhotoListCtrl', {
					$scope: scope,
					Photos: Photos
				});
				httpBackend.flush();
				expect(scope.photoHeadline).toEqual('List of Photos');
			}));

			it('should define an orderProp property', inject(function ($rootScope, Photos, $controller) {
				// Define.
				var scope, ctrl;

				httpBackend.expectGET(requestUrl);
				scope = $rootScope.$new();
				ctrl = $controller('PhotoListCtrl', {
					$scope: scope,
					Photos: Photos
				});
				httpBackend.flush();
				expect(scope.orderProp).toEqual('name');
			}));
		});
	}
);