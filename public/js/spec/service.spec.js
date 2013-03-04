define(
	[
		'service/service'
	],
	function (service) {
		describe('Service object.', function () {
			it('should contain a label property.', function () {
				var mock = {label: 'service'};
				expect(mock).toEqual(service);
			});
		});
	}
);