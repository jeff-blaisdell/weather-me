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
				date.dayOfWeek = DayConverter.convert(date.time.getUTCDay());
				date.month     = MonthConverter.convert(date.time.getUTCMonth());
				date.year      = date.time.getFullYear();
				date.day       = date.time.getUTCDate();
			}
			return date;
		}

		return {
			convert: function( response ) {
				var weather = {};
				var days    = [];
				weather.temperatureMax = 0;
				weather.temperatureMin = 0;


				if ( response && response.data && response.data.daily && response.data.daily.data ) {

					weather.temperatureMax = response.data.daily.data[0].temperatureMax;
					weather.temperatureMin = response.data.daily.data[0].temperatureMin;

					for (var i = 0, length = response.data.daily.data.length; i < length; i++) {
						var d = response.data.daily.data[i];
						var day = {};
						day.date = createDate(d.time);
						day.icon = d.icon;
						day.imageUrl = images[day.icon];
						day.temperatureMin = (typeof d.temperatureMin === 'number' ? Math.round(d.temperatureMin) : 0);
						day.temperatureMax = (typeof d.temperatureMax === 'number' ? Math.round(d.temperatureMax) : 0);
						day.dewPoint = d.dewPoint;
						day.humidity = (typeof d.humidity === 'number' ? Math.round(d.humidity) : 0);
						day.windSpeed = (typeof d.windSpeed === 'number' ? Math.round(d.windSpeed) : 0);
						day.precipProbability = (typeof d.precipProbability === 'number' ? d.precipProbability * 100 : 0);
						day.precipProbability = (typeof day.precipProbability === 'number' ? Math.round(day.precipProbability) : 0);
						days.push(day);

						if (day.temperatureMin < weather.temperatureMin) {
							weather.temperatureMin = day.temperatureMin;
						}

						if (day.temperatureMax > weather.temperatureMax) {
							weather.temperatureMax = day.temperatureMax;
						}

					}
					weather.days = days;
				}

				return weather;
			}
		};

	}]);

});