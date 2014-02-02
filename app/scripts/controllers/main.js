define([
	'app',
	'services/location',
	'services/weather'
], function( app ) {

	'use strict';

	app.controller('MainCtrl', ['$scope', '$filter', 'Location', 'Weather', function ($scope, $filter, Location, Weather) {

		/**
		 * A filter used to only display days
		 * with matching weather conditions.
		 */
		function weatherFilter(day) {
			if (day.temperatureMin < $scope.query.minTemperature) {
				return false;
			} else if (day.temperatureMax > $scope.query.maxTemperature) {
				return false;
			}
			return true;
		}

		/**
		 * A constructor function to represent the various filtering capabilities.
		 * Primarily needed to translate range input String values to Numbers.
		 * @param maxTemp (number)
		 * @param minTemp (number)
		 */
		function Query(maxTemp, minTemp) {
			this._maxTemperature = maxTemp;
			this._minTemperature = minTemp;
		}

		Object.defineProperties(Query.prototype, {
			'maxTemperature': {
				get: function() {
					return this._maxTemperature;
				},
				set: function(val) {
					val = parseInt(val);
					this._maxTemperature = val;
				}
			},
			'minTemperature': {
				get: function() {
					return this._minTemperature;
				},
				set: function(val) {
					val = parseInt(val);
					this._minTemperature = val;
				}
			}
		});

		/**
		 * Attempt to resolve weather conditions at current location.
		 */
		function lookupWeather() {
			if ($scope.location && $scope.location.latitude && $scope.location.longitude) {
				Weather.get({ 'latitude': $scope.location.latitude, 'longitude': $scope.location.longitude })
					.$promise
					.then(function(weather) {
						$scope.weather        = weather;
						if (weather) {
							$scope.query.maxTemperature = weather.temperatureMax;
							$scope.query.minTemperature = weather.temperatureMin;
						}
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
		$scope.query              = new Query(0, 0);
		$scope.weatherFilter      = weatherFilter;
		$scope.lookupLocation     = lookupLocation;
		$scope.lookupWeather      = lookupWeather;
		$scope.$watch('location', lookupWeather);

		/*
		 * Default Location.
		 */
		lookupLocation.apply({ 'address': '15 S 5th St 300, Minneapolis, MN'});

	}]);

});
