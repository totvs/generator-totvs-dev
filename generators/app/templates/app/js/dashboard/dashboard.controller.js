/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module dashboard
* @name DashboardController
* @object controller
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires dashboard.module
*
* @dependencies
*
* @description dashboard controller
*/

(function () {

    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$state', 'dashboardFactory'];

    function DashboardController($state, dashboardFactory) {

        // *********************************************************************************
		// *** Variables
		// *********************************************************************************

        var self = this;

        // *********************************************************************************
		// *** Public Properties and Methods
		// *********************************************************************************

        self.dashboard = {};
        self.settings = settings;

        init();

        // *********************************************************************************
		// *** Controller Initialize
		// *********************************************************************************

        function init() {
            dashboardFactory.get(function (data) {
                self.dashboard = data;
            });
		}

        // *********************************************************************************
		// *** Functions
		// *********************************************************************************

        function settings() {
            $state.go('dashboard.settings');
        }
    }

}());
