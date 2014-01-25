define([
    'angular'
], function(angular) {

    angular.module('wmDebounce', [])
        .directive('wmDebounce', function($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 99,
            link: function(scope, elm, attr, ngModelCtrl) {
                if (attr.type === 'radio' || attr.type === 'checkbox') return;

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

        }
    });


});