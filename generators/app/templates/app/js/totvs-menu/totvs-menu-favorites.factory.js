/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsMenu
* @name totvsMenuFavorites
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
        .factory('totvsMenuFavorites', totvsMenuFavorites);

    totvsMenuFavorites.$inject = [];

    function totvsMenuFavorites() {

        var favorites = [],
            factory = {
                getProgramFavorites: getProgramFavorites
            };

        return factory;

        function getProgramFavorites(callback) {
            // TODO: Get list of server
            if (favorites.length === 0) {
                favorites = GenerateFavorites();
            }

            callback(favorites);
        }

    }

    // ********************************************************************
    // Function - Simulation
    // ********************************************************************

    function GenerateFavorites() {
        var i,
            max = 0,
            favorites = [],
            module = 1;

        max = Math.floor((Math.random() * 60) + 1);

        for (i = 1; i <= max; i++) {
            module = Math.floor((Math.random() * 3) + 1);

            favorites.push(new Favorite(
                'Favorito #' + i,
                'Programa favorito #' + i + '.' + module,
                'Modulo #' + module,
                '/',
                Math.floor((Math.random() * 4) + 1)
            ));
        }

        return favorites;
    }

    function Favorite(program, description, module, url, type) {
        this.favorite = true;
        this.program = program || '[program]';
        this.description = description || '[description]';
        this.module = module || '[module]';
        this.url = url || '/';
        this.type = type || 1;
    }

}());
