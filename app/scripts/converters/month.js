define([
	'app'
], function(app) {

	'use strict';

	app.factory('MonthConverter', [function () {

		var monthArray =new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

		return {
			convert: function( monthNumber ) {

				var month = null;
				if (monthNumber && typeof monthNumber === 'number' && monthNumber >= 0 || monthNumber <= 11) {
					month = monthArray[month];
				}

				return month;
			}
		};

	}]);

});