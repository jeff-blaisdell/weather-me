define([
	'app'
], function(app) {

	'use strict';

	app.factory('LocationConverter', [function () {
		return {
				convert: function( response ) {
					var location = {};

					if ( response && response.data && response.data.results ) {
						var data = response.data.results[0];
						data = data || {};
						var geo  = ( data.geometry && data.geometry.location ? data.geometry.location : {});

						location.name      = data.formatted_address; // jshint ignore:line
						location.latitude  = geo.lat;
						location.longitude = geo.lng;
					}

					return location;
				}
			};

	}]);

});