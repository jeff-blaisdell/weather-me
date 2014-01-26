define([
    'app'
], function(app) {
    app.factory('WeatherConverter', [function () {

        var dayArray=new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var monthArray=new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
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
        }

        return {
            convert: function( response ) {
                var weather = {};

                if ( response && response.data && response.data.daily && response.data.daily.data ) {
                    var days   = [];

                    for (var i = 0, length = response.data.daily.data.length; i < length; i++) {
                        var d = response.data.daily.data[i];
                        var day = {};
                        day.time = new Date(d.time * 1000);
                        day.dayOfWeek = dayArray[day.time.getDay()];
                        day.date = day.time.getUTCDate();
                        day.month = monthArray[day.time.getUTCMonth()];
                        day.year = day.time.getFullYear();
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