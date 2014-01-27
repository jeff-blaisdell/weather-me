requirejs.config({
	baseUrl: '/scripts',
	paths: {
		'jquery': '../bower_components/jquery/jquery',
		'angular': '../bower_components/angular/angular',
		'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
		'angular-resource': '../bower_components/angular-resource/angular-resource',
		'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
		'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
		'angular-animate': '../bower_components/angular-animate/angular-animate',
		'angular-ui-router': 'lib/angular-ui-router',
		'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap',
		'angular-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls'
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'angular': {
			exports: 'angular'
		},
		'bootstrap': ['jquery'],
		'angular-resource': ['angular'],
		'angular-cookies': ['angular'],
		'angular-sanitize': ['angular'],
		'angular-animate': ['angular'],
		'angular-ui-router': ['angular'],
		'angular-bootstrap': ['angular'],
		'angular-bootstrap-tpls': ['angular-bootstrap']
	}
});

require([
	'jquery',
	'angular',
	'app',
	'bootstrap',
	'controllers/main'
], function( $, angular ) {

	'use strict';

	angular.bootstrap(document, ['weatherMeApp']);

});