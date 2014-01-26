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
		}

		/**
		 * Attempts to resolve an address
		 * based on the entered address value.
		 */
		function lookupLocation() {
			var address = this.address; // jshint ignore:line
			Location.get({ 'address': address }).$promise
				.then(function(location) {
					$scope.location = location;
				})
				.catch(function(err) {
					console.log(['Unable to retrieve location.', err]);
				});
		}

		$scope.siteName           = 'Weather Me';
		$scope.siteText           = 'Play outside!';
		$scope.address            = null;
		$scope.location           = null;
		$scope.weather            = null;
        $scope.isFiltersCollapsed = true;
        $scope.maxTemperature     = 30;
        $scope.minTemperature     = -10;
		$scope.lookupLocation     = lookupLocation;
		$scope.lookupWeather      = lookupWeather;
		$scope.$watch('location', lookupWeather);

		/*
		 * Default Location.
		 */
		lookupLocation.apply({ 'address': '15 S 5th St 300, Minneapolis, MN'});


	}]);

});
