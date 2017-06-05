/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsCustomer
* @name TotvsCustomerListController
* @object controller
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires
*
* @dependencies
*
* @description Responsável por interagir com o REST, buscando e enviado informações para o servidor (back-end)
*/

(function () {

    'use strict';

    angular
        .module('customer')
        .factory('customerFactory', customerFactory);

    customerFactory.$inject = ['$totvsresource'];

    function customerFactory($totvsresource) {

        var url = 'https://thf.totvs.com.br/sample/api/customers/:id',
            factory;

        factory = $totvsresource.REST(url, {}, {});

        factory.findRecords = findRecords; // Busca todos os registros
        factory.getRecord = getRecord; // Busca um registro específico
        factory.saveRecord = saveRecord; // Salva um novo registro
        factory.updateRecord = updateRecord; // Atualiza um registro
        factory.deleteRecord = deleteRecord; // Exclui um registro

        return factory;

        // *********************************************************************************
		// *** Functions
		// *********************************************************************************

        function findRecords(parameters, callback) {
            return this.TOTVSQuery(parameters, callback);
        }

        function getRecord(id, callback) {
            return this.TOTVSGet({id: id}, callback);
        }

        function saveRecord(model, callback) {
            return this.TOTVSSave({}, model, callback);
        }

        function updateRecord(id, model, callback) {
            return this.TOTVSUpdate({id: id}, model, callback);
        }

        function deleteRecord(id, callback) {
            return this.TOTVSRemove({id: id}, callback);
        }
    }

}());
