/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module customer
* @object module
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @dependencies
*
* @description Modulo customer
*/

(function () {
    'use strict';

    angular
        .module('customer')
        .config(customerRouteConfig);

    customerRouteConfig.$inject = [<% if (useUIRouter) { %>'$stateProvider'<% } else { %>'$routeProvider'<% } %>];

    function customerRouteConfig(<% if (useUIRouter) { %>$stateProvider<% } else { %>$routeProvider<% } %>) {

        <% if (useUIRouter) { %>$stateProvider.state('customers', {
            abstract: true,
            template: '<ui-view/>'

        }).state('customers.start', {
            url: '/customers',
            controller: 'CustomerListController',
            controllerAs: 'controller',
            templateUrl: 'js/customers/customers-list.view.html',
            title: 'Customers'

        }).state('customers.detail', {
            url: '/customers/detail/:id',
            controller: 'CustomerDetailController',
            controllerAs: 'controller',
            templateUrl: 'js/customers/customers-detail.view.html',
            title: 'Customers'

        }).state('customers.new', {
            url: '/customers/new',
            controller: 'CustomerEditController',
            controllerAs: 'controller',
            templateUrl: 'js/customers/customers-edit.view.html',
            title: 'Customers'

        }).state('customers.edit', {
            url: '/customers/edit/:id',
            controller: 'CustomerEditController',
            controllerAs: 'controller',
            templateUrl: 'js/customers/customers-edit.view.html',
            title: 'Customers'

        });<% } else { %>$routeProvider.when('/customers', {
            controller: 'CustomerListController',
            controllerAs: 'controller',
            templateUrl: 'js/customers/customers-list.view.html',
            title: 'Customers'

        }).when('/customers/detail/:id', {
            controller: 'CustomerDetailController',
            controllerAs: 'controller',
            templateUrl: 'js/customers/customers-detail.view.html',
            title: 'Customers'

        }).when('/customers/new', {
            controller: 'CustomerEditController',
            controllerAs: 'controller',
            templateUrl: 'js/customers/customers-edit.view.html',
            title: 'Customers'

        }).when('/customers/edit/:id', {
            controller: 'CustomerEditController',
            controllerAs: 'controller',
            templateUrl: 'js/customers/customers-edit.view.html',
            title: 'Customers'

        });<% } %>
    }

}());
