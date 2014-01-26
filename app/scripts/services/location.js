define([
	'app',
	'converters/location'
], function(app) {

	'use strict';

	app.factory('Location', ['$resource', '$q', 'LocationConverter', function ($resource, $q, locationConverter) {

		return $resource(
			'http://maps.googleapis.com/maps/api/geocode/:contentType',
			{
				contentType: 'json',
				sensor: false,
				address: '55125'
			}, {
				get: {
					method: 'GET',
					interceptor: {
						response: function (response) {
							var location = locationConverter.convert(response);
							return $q.when(location);
						},
						responseError: function (err) {
							err = err || {};
							err.message = 'Unable to retrieve result from Google Geocode API.';
							return $q.reject(err);
						}
					},
					isArray: false
				}
			}

		);

	}]);

});