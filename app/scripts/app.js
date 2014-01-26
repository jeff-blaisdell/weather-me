define([
	'angular',
	'jquery',
	'angular-cookies',
	'angular-resource',
	'angular-sanitize',
	'angular-ui-router',
    'directives/debounce'
], function( angular ) {

	'use strict';

	var app = angular.module('weatherMeApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ui.router',
        'wmDebounce'
	]);

	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $locationProvider.html5Mode(true);


		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise('/');

		// Define Application States
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: '/views/main.html'
			});
	});

	return app;

});