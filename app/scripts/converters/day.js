define([
	'app'
], function(app) {

	'use strict';

	app.factory('DayConverter', [function () {

		var dayArray = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

		return {
			convert: function( dayNumber ) {

				var day = null;
				if (dayNumber && typeof dayNumber === 'number' && dayNumber >= 0 || dayNumber <= 11) {
					day = dayArray[dayNumber];
				}

				return day;
			}
		};

	}]);

});