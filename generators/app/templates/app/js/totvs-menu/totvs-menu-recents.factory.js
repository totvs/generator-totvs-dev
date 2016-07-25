/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsMenu
* @name totvsMenuRecents
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

    'use strict';

    angular
        .module('totvsMenu')
        .factory('totvsMenuRecents', totvsMenuRecents);

    totvsMenuRecents.$inject = [];

    function totvsMenuRecents() {

        var recents = [],
            factory = {
                getProgramRecents: getProgramRecents
            };

        return factory;

        function getProgramRecents(callback) {

            // TODO: Get list of server
            if (recents.length === 0) {
                recents = GenerateRecents();
            }

            callback(recents);
        }

    }

    // ********************************************************************
    // Function - Simulation
    // ********************************************************************

    function GenerateRecents() {
        var i,
            max = 0,
            recents = [],
            module = 1;

        max = Math.floor((Math.random() * 30) + 1);

        for (i = 1; i <= max; i++) {
            module = Math.floor((Math.random() * 3) + 1);

            recents.push(new Recent(
                Boolean(Math.floor(Math.random() * 2)),
                'Recente #' + i,
                'Programa recente #' + i + '.' + module,
                'Modulo #' + module,
                '/',
                Math.floor((Math.random() * 4) + 1)
            ));
        }

        return recents;
    }

    function Recent(favorite, program, description, module, url, type) {
        this.favorite = favorite;
        this.program = program || '[program]';
        this.description = description || '[description]';
        this.module = module || '[module]';
        this.url = url || '/';
        this.type = type || 1;
    }

}());
