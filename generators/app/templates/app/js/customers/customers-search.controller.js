/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module customer
* @name CustomerSearchController
* @object controller
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires
*
* @dependencies
*
* @description
*/

(function () {

    'use strict';

    angular
        .module('customer')
        .controller('CustomerSearchController', CustomerSearchController);

    CustomerSearchController.$inject = ['$modalInstance', 'data'];

    function CustomerSearchController($modalInstance, data) {

        // *********************************************************************************
		// *** Variables
		// *********************************************************************************

        var self = this;

        // *********************************************************************************
		// *** Public Properties and Methods
		// *********************************************************************************

        self.advancedSearch = angular.copy(data); // copia os dados da pesquisa anterior para o controller
        self.search = search;
        self.close = close;

        // *********************************************************************************
		// *** Functions
		// *********************************************************************************

        function search() {
            $modalInstance.close(self.advancedSearch);
        }

        function close() {
            $modalInstance.dismiss();
        }
    }

}());
