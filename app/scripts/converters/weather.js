define([
    'app'
], function(app) {
    app.factory('WeatherConverter', [function () {

        return {
            convert: function( response ) {
                var weather = {};

                if ( response && response.data && response.data.results ) {

                }

                return weather;
            }
        };

    }]);

});