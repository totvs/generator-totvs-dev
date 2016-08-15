/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsMenu
* @name totvsMenuProcesses
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
        .module('totvsDesktop')
        .factory('totvsDesktopMenuProcesses', totvsDesktopMenuProcesses);

    totvsDesktopMenuProcesses.$inject = [];

    function totvsDesktopMenuProcesses() {

        var processes = [],
            factory = {
                getMenuProcesses: getMenuProcesses
            };

        return factory;

        function getMenuProcesses(callback) {
            // TODO: Get list of server
            if (processes.length === 0) {
                processes = GenerateProcesses();
            }

            callback(processes);
        }

    }

    // ********************************************************************
    // Function - Simulation
    // ********************************************************************

    function GenerateProcesses() {
        var i,
            max = 0,
            processes = [];

        max = Math.floor((Math.random() * 10) + 1);

        for (i = 1; i <= max; i++) {
            processes.push(new Process(
                'Programa Processo #' + i,
                '/'
            ));
        }

        return processes;
    }

    function Process(program, url) {
        this.program = program || '[program]';
        this.url = url || '/';
    }

}());
