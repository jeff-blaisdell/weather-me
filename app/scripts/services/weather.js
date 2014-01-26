define([
	'app',
	'converters/weather'
], function(app) {

	'use strict';

	app.factory('Weather', ['$resource', '$q', 'WeatherConverter', function ($resource, $q, weatherConverter) {

		return $resource(
			'http://localhost:9010/weather/:latitude/:longitude',
			{}, {
				get: {
					method: 'GET',
					interceptor: {
						response: function (response) {
							var location = weatherConverter.convert(response);
							return $q.when(location);
						},
						responseError: function (err) {
							err = err || {};
							err.message = 'Unable to retrieve result from Forecast.io API.';
							return $q.reject(err);
						}
					},
					isArray: false
				}
			}

		);

	}]);

});