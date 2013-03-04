/*jshint nomen:false */
/*global define:true, describe:true, beforeEach:true, module:true it:true, expect:true, inject:true */

define(
	[
		'angular',
		'angularMock'
	],
	function (angular) {
		'use strict';

		// Angular injector.
		var injector = angular.injector(['gallery']);

		// Testing controllers requires the use of angular.mock.inject
		// Angular mock provides the module and inject methods used in
		// the below sample tests.
		//
		// see: http://docs.angularjs.org/api/angular.mock.inject
		describe('PhotoListCtrl', function () {
			// Load modules that need to be tested.
			beforeEach(module('gallery'));

			it('should define a photoHeadline property', inject(function ($rootScope, Photo, $controller) {
				/*
				var scope, ctrl;
				scope = $rootScope.$new();
				ctrl = $controller('PhotoListCtrl', {
					$scope: scope,
					Photo: Photo
				});

				expect(scope.photoHeadline).toEqual('List of Photos');
				*/
			}));
		});
	}
);