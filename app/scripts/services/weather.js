define([
    'app',
    'converters/weather'
], function(app) {
    app.factory('Weather', ['$resource', '$q', 'WeatherConverter', function ($resource, $q, weatherConverter) {

        return $resource(
            'http://api.forecast.io/forecast/c4d2cc751f78d2f8c7d9ca03257baede',
            {}, {
                get: {
                    method: 'GET',
                    interceptor: {
                        response: function (response) {
                            var location = weatherConverter.convert(response);
                            return $q.when(location);
                        },
                        responseError: function (err) {
                            err || {};
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