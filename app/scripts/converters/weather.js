define([
	'app',
	'converters/month',
	'converters/day'
], function(app) {

	'use strict';

	app.factory('WeatherConverter', ['MonthConverter', 'DayConverter', function (MonthConverter, DayConverter) {

		var images = {
			'clear-day': '/images/sun.svg',
			'clear-night': '/images/moon.svg',
			'rain': '/images/raindrop.svg',
			'snow': '/images/snow.svg',
			'sleet': '/images/snow.svg',
			'wind': '/images/wind.svg',
			'fog': '/images/cloud.svg',
			'cloudy': '/images/cloud.svg',
			'partly-cloudy-day': '/images/cloud.svg',
			'partly-cloudy-night': '/images/cloud.svg',
			'hail': '/images/raindrop.svg',
			'thunderstorm': '/images/raindrop.svg',
			'tornado': '/images/tornado.svg'
		};

		function createDate(unixTime) {
			var date = {};
			if (unixTime && typeof unixTime === 'number') {
				date.time      = new Date(unixTime * 1000);
				date.dayOfWeek = DayConverter.convert(date.time);
				date.month     = MonthConverter.convert(date.time.getUTCMonth());
				date.year      = date.time.getFullYear();
				date.day       = date.time.getUTCDate();
			}
			return date;
		}

		return {
			convert: function( response ) {
				var weather = {};

				if ( response && response.data && response.data.daily && response.data.daily.data ) {
					var days   = [];

					for (var i = 0, length = response.data.daily.data.length; i < length; i++) {
						var d = response.data.daily.data[i];
						var day = {};
						day.date = createDate(d.time);
						day.icon = d.icon;
						day.imageUrl = images[day.icon];
						day.temperatureMin = d.temperatureMin;
						day.temperatureMax = d.temperatureMax;
						day.dewPoint = d.dewPoint;
						day.humidity = d.humidity;
						day.windSpeed = d.windSpeed;
						days.push(day);
					}
					weather.days = days;
				}

				return weather;
			}
		};

	}]);

});