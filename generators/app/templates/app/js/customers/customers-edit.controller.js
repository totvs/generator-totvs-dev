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
* @description Controller responsável por exibir os detalhes
*/

(function () {

    'use strict';

    angular
        .module('customer')
        .controller('CustomerEditController', CustomerEditController);

    CustomerEditController.$inject = [
        '$scope',
        '$stateParams',
        '$state',
        '$window',
        'totvs.app-notification.Service',
        'i18nFilter',
		'customerFactory'
    ];

	function CustomerEditController(
        $scope, $stateParams, $state, $window, notification, i18nFilter, customerFactory) {

		// *********************************************************************************
		// *** Variables
		// *********************************************************************************

		var self = this;

        // *********************************************************************************
		// *** Public Properties and Methods
		// *********************************************************************************

        self.customer = {};
        self.cancel = cancel;
        self.save = save;
        self.saveNew = saveNew;<% if (singlePageApp) { %>

        init();<% } %>

        // *********************************************************************************
		// *** Controller Initialize
		// *********************************************************************************<% if (singlePageApp) { %>

        function init() {

            if ($stateParams && $stateParams.id) {
                loadRecord($stateParams.id);
            }

        }<% } %><% if (tabPageApp) { %>

        function init(cacheController) {

            if (!cacheController) {
                if ($stateParams && $stateParams.id) {
                    loadRecord($stateParams.id);
                }
            } else {
                // Buscando dados iniciais do "cache"
                angular.forEach(cacheController, function(value, property) {
                    self[property] = value;
                });
            }

		}

        // *********************************************************************************
		// *** Events Listners
		// *********************************************************************************

        $scope.$on('$totvsViewServiceInit', function (event, cacheController) {
            init(cacheController);
        });<% } %>

		// *********************************************************************************
		// *** Functions
		// *********************************************************************************

		function loadRecord(id) {
			customerFactory.getRecord(id, function (customer) {
				if (customer && customer.id) {
					self.customer = customer;
				} else {
                    notification.notify({
                        type: 'warning',
                        title: '404',
                        detail: 'Registro "' + id + '" não encontrado, mas você pode inserir um novo registro. =P'
                    });

                    $state.go('customers.new');
                }
			});
		}

        function cancel() {
			notification.question({
				title: 'l-question',
				text: i18nFilter('l-cancel-operation'),
				cancelLabel: 'l-no',
				confirmLabel: 'l-yes',
				callback: function (isPositiveResult) {
					if (isPositiveResult) {
						$window.history.back();
					}
				}
			});
		}

        function save() {
			if (self.customer.id) {
				customerFactory.updateRecord(self.customer.id, self.customer, function (result) {
					$state.go('customers.detail', {id: self.customer.id});
				});
			} else {
				customerFactory.saveRecord(self.customer, function (result) {
					$state.go('customers.detail', {id: result.id});
				});
			}
		}

        function saveNew() {
			if (self.customer.id) {
				customerFactory.updateRecord(self.customer.id, self.customer, function (result) {
					$state.go('customers.new');
				});
			} else {
				customerFactory.saveRecord(self.customer, function (result) {
                    $state.go($state.current, {}, {reload: true});
				});
			}
		}

	}

}());
