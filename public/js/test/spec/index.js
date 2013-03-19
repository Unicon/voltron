/*jshint nomen:false */
/*global define:true */

define(function () {
	'use strict';

	return {
		specs: [
			'spec/controller/PhotoDetailCtrl.spec',
			'spec/controller/PhotoListCtrl.spec',
			'spec/resource/Photos.spec',
			'spec/resource/Photo.spec',
			'spec/filter/Localize.spec',
			'spec/service/BrowserDetect.spec'
		]
	};
});