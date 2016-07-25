/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsApp
* @name totvsAppConfig
* @object config
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires totvs-app.module
*
* @dependencies
*
* @description Main config
*/

(function () {

    'use strict';

    angular
        .module('totvsApp')
        .config(totvsAppConfig);

    totvsAppConfig.$inject = ['$httpProvider', 'TotvsI18nProvider'];

    function totvsAppConfig($httpProvider, TotvsI18nProvider, TOTVSProfileProvider) {

        $httpProvider.interceptors.push('totvsHttpInterceptor');

        TotvsI18nProvider.setBaseContext('/');

    }

}());
