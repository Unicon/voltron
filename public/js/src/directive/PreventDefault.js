/*jshint nomen:false, scripturl:true */
/*global define:true */

define(
	[
		'app',
		'angular',
		'jquery',
		'underscore',
		'bootstrap'
	],
	function (app, angular, $, _) {
		'use strict';

		/**
		The PreventDefualt directive is an example of a simple directive.
		It is meant to prevent default behavior when a click event is
		encountered on an element.

		@class PreventDefault
		@submodule directive
		@constructor
		**/
		app.gallery.directive(
			'preventDefault',
			[
				function () {
					var directive = {
						// Compile function does not have access to scope.
						// The compile function only modifies the template.
						// It is really only needed when changes to the template
						// need to be made across all instances of your directives.
						compile: function compile(cElement, attrs) {

							// The linking function executes once per instantiated template.
							return function linkFn(scope, lElement, attrs) {
								// Directives can inherit scope from parent controller.
								// Ex: scope.$parent.photoHeadline

								// Add 'javascript:;' pattern to href.
								if (lElement.is('a')) {
									lElement.attr('href', 'javascript:;');
								}

								// Always attempt to prevent default behavior.
								lElement.on('click', function (e) {
									e.preventDefault();
								});
							}
						}
					};

					return directive;
				}
			]
		);
	}
);