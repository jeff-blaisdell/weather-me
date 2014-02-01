/**
 * debounce directive used for throttling angular model updates.
 * taken from here:
 * http://tommaitland.net/2013/11/debounced-delayed-throttled-model-updates-angular-1-2/
 */
define([
	'angular'
], function(angular) {

	'use strict';

	angular.module('wmDebounce', [])
		.directive('wmDebounce', ['$timeout', function($timeout) {
		return {
			restrict: 'A',
			require: 'ngModel',
			priority: 99,
			link: function(scope, elm, attr, ngModelCtrl) {
				if (attr.type === 'radio' || attr.type === 'checkbox') {
					return;
				}

				elm.unbind('input');

				var debounce;
				elm.bind('input', function() {
					$timeout.cancel(debounce);
					debounce = $timeout( function() {
						scope.$apply(function() {
							ngModelCtrl.$setViewValue(elm.val());
						});
					}, 1000);
				});
				elm.bind('blur', function() {
					scope.$apply(function() {
						ngModelCtrl.$setViewValue(elm.val());
					});
				});
			}

		};
	}]);


});