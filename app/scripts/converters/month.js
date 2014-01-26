define([
	'app'
], function(app) {

	'use strict';

	app.factory('MonthConverter', [function () {

		var monthArray =new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

		return {
			convert: function( monthNumber ) {

				var month = null;
				if (monthNumber && typeof monthNumber === 'number' && monthNumber >= 0 || monthNumber <= 11) {
					month = monthArray[monthNumber];
				}

				return month;
			}
		};

	}]);

});