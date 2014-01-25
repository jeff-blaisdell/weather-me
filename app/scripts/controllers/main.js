define([
	'app',
    'services/location',
    'services/weather'
], function( app ) {


	'use strict';

	app.controller('MainCtrl', ['$scope', 'Location', 'Weather', function ($scope, Location, Weather) {

        /**
         * Attempt to resolve weather conditions at current location.
         */
        function lookupWeather() {
            if ($scope.location && $scope.location.latitude && $scope.location.longitude) {
                Weather.get({ 'latitude': $scope.location.latitude, 'longitude': $scope.location.longitude })
                    .$promise
                    .then(function(weather) {
                        $scope.weather = weather;
                    })
                    .catch(function(err) {
                        console.log(['Unable to retrieve weather.', err]);
                    });
            }
        };

        /**
         * Attempts to resolve an address
         * based on the entered address value.
         */
        function lookupLocation() {
            Location.get({ 'address': this.address })
                .$promise
                .then(function(location) {
                    $scope.location = location;
                })
                .catch(function(err) {
                    console.log(['Unable to retrieve location.', err]);
                });
        };



		$scope.address        = null;
        $scope.location       = null;
        $scope.weather        = null;
        $scope.lookupLocation = lookupLocation;
        $scope.lookupWeather  = lookupWeather;

        $scope.$watch('location', lookupWeather);

	}]);

});
