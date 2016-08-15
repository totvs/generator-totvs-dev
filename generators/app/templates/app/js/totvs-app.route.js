/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsApp
* @name totvsRouteConfig
* @object config
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires totvs-app.module
*
* @dependencies
*
* @description App config route
*/

(function () {

    'use strict';

    angular
        .module('totvsApp')
        .config(totvsRouteConfig);

    totvsRouteConfig.$inject = [<% if (useUIRouter) { %>'$stateProvider', '$urlRouterProvider'<% } else { %>'$routeProvider'<% } %>];

    function totvsRouteConfig(<% if (useUIRouter) { %>$stateProvider, $urlRouterProvider<% } else { %>$routeProvider<% } %>) {

        <% if (useUIRouter) { %>$stateProvider.state('home', {
            abstract: true,
            template: '<ui-view/>'

        }).state('home.blank', {
            url: '/'<% if (tabPageApp) { %>,
            controller: 'TotvsMenuController',
            controllerAs: 'menu',
            templateUrl: 'js/totvs-menu/totvs-menu.view.html',
            title: 'Home'<% } %>

        });

        $urlRouterProvider.otherwise('/');<% } else { %>$routeProvider.when('/', {<% if (tabPageApp) { %>
            controller: 'TotvsMenuController',
            controllerAs: 'menu',
            templateUrl: 'js/totvs-menu/totvs-menu.view.html',
            title: 'Home'<% } %>

        });

        $routeProvider.otherwise('/');<% } %>

    }

}());
