/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module dashboard
* @object module
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @dependencies
*
* @description Modulo dashboard
*/

(function () {
    'use strict';

    angular
        .module('dashboard')
        .config(dashboardRouteConfig);

    dashboardRouteConfig.$inject = [<% if (useUIRouter) { %>'$stateProvider'<% } else { %>'$routeProvider'<% } %>];

    function dashboardRouteConfig(<% if (useUIRouter) { %>$stateProvider<% } else { %>$routeProvider<% } %>) {

        <% if (useUIRouter) { %>$stateProvider.state('dashboard', {
            abstract: true,
            template: '<ui-view/>'

        }).state('dashboard.start', {
            url: '/dashboard',
            controller: 'DashboardController',
            controllerAs: 'controller',
            templateUrl: 'js/dashboard/dashboard.view.html',
            title: 'Dashboard'

        }).state('dashboard.settings', {
			url: '/dashboard/settings',
            controller: 'DashboardSettingsController',
            controllerAs: 'controller',
            templateUrl: 'js/dashboard/dashboard-settings.view.html',
            title: 'Dashboard'

        });<% } else { %>$routeProvider.when('/dashboard', {
            controller: 'DashboardController',
            controllerAs: 'controller',
            templateUrl: 'js/dashboard/dashboard.view.html',
            title: 'Dashboard'

        }).when('/dashboard/settings', {
            controller: 'DashboardSettingsController',
            controllerAs: 'controller',
            templateUrl: 'js/dashboard/dashboard-settings.view.html',
            title: 'Dashboard'

        });<% } %>
    }

}());
