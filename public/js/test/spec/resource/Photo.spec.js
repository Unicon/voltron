/*jshint nomen:false */
/*global define:true, describe:true, beforeEach:true, module:true it:true, expect:true, inject:true, runs:true, waitsFor:true */

define(
	[
		'app',
		'angular',
		'angularMock',
		'underscore',
		'resource/Photo'
	],
	function (app, angular, mock, _) {

		'use strict';

		var properties = ['name', 'description', 'url', 'category'],
			photos = [
				{
					"id": "100",
					"name": "Fish Hanging",
					"description": "Fish captured with empty hand",
					"url": "../../img/fish_hanging.jpg",
					"category": "animals"
				}
			],
			list, obj;

		describe('Photo resource', function () {

			beforeEach(module('gallery'));

			beforeEach(inject(function ($httpBackend) {
				$httpBackend.whenGET('/data/photos.json').respond(photos);
				$httpBackend.whenGET('/data/1.json').respond(photos[0]);
			}));

			it('should get a list of photos', inject(
				function ($httpBackend, Photo) {
					Photo.query(
						function (data) {
							list = data;
						}
					);

					$httpBackend.flush();
					expect(JSON.stringify(list)).toEqual(JSON.stringify(photos));
				}
			));

			it('should return photos with the following properties: ' + properties.toString(), inject(
				function ($httpBackend, Photo) {
					Photo.get(
						{
							id:1
						},
						function (data) {
							obj = data;
						}
					);

					$httpBackend.flush();
					expect(JSON.stringify(obj)).toEqual(JSON.stringify(photos[0]));
				}
			));
		});
	}
);