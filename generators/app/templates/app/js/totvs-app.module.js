/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsApp
* @object module
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @dependencies totvsHtmlFramework
*
* @description Main module app
*/

(function () {
    'use strict';

    angular
        .module('totvsApp', [
            'ngSanitize',
            <% if (useUIRouter) { %>'ui.router'<% } else { %>'ngRoute'<% } %>,
            'ui.mask',
            'ui.select',
            'totvsHtmlFramework',
            'totvsDesktop',
            'totvsMenu'<% if (createCRUD) { %>,
            'customer'<% } %><% if (createDashboard) { %>,
            'dashboard'<% } %>
        ]);

}());
