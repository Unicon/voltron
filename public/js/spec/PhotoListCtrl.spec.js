define(
	[
		'app',
		'controller/PhotoListCtrl'
	],
	function (PhotoListCtrl) {

		//console.log('', PhotoListCtrl);
		// Angular injector.
		var injector = angular.injector(['gallery']);
		var myctrl = injector.get('PhotoListCtrl');
		console.log(myctrl);



		return {};
		/*
		describe('PhotoListCtrl.', function () {
			// Define.
			var rootScope, http, controller, scope, ctrl, injector, Photo;

			// Angular injector.
			injector = angular.injector(['gallery']);
			var myctrl = injector.get('PhotoListCtrl');
			console.log(myctrl);

			beforeEach(function () {
				rootScope = injector.get('$rootScope');
				scope = rootScope.$new();
				http = injector.get('$http');
				Photo = injector.get('Photo');
				controller = injector.get('$controller');
				ctrl = controller(PhotoListCtrl, {$scope: scope, $http: http, Photo: Photo});
			});

			it('should set the default value of orderProp model', function () {
				console.log(ctrl);
				expect(scope.orderProp).toBe('name');
			});
		});
		*/
	}
);