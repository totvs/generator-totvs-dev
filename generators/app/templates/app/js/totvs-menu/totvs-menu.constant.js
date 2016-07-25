/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsMenu
* @name totvsMenuConstant
* @object factory
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires totvs-menu.module
*
* @dependencies
*
* @description
*/

(function () {

    angular
        .module('totvsMenu')
        .constant('totvsMenuConstant', {
            menuGroups: {
                RECENTS: "recents",
                FAVORITES: "favorites",
                APPLICATIONS: "application",
                PROCESSES: "processes"
            }
        });

}());
