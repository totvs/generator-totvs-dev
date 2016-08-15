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
* @description Controller responsável por listar os registros
*/

(function () {

    'use strict';

    angular
        .module('customer')
        .controller('CustomerListController', CustomerListController);

    CustomerListController.$inject = [
        '$scope',
        '$modal',
        'totvs.app-notification.Service',
        'dateFilter',
        'i18nFilter',
		'customerFactory'
    ];

    function CustomerListController($scope, $modal, notification, dateFilter, i18nFilter, customerFactory) {

        // *********************************************************************************
		// *** Variables
		// *********************************************************************************

        var self = this,
            advancedSearch = {};

        // *********************************************************************************
		// *** Public Properties and Methods
		// *********************************************************************************

        self.records = [];
		self.recordsCount = 0;
        self.disclaimers = [];
        self.searchText = '';
        self.search = search;
        self.loadRecords = loadRecords;
        self.openAdvancedSearch = openAdvancedSearch;
        self.removeDisclaimer = removeDisclaimer;
        self.applyEdit = applyEdit;
        self.onRemove = onRemove;<% if (singlePageApp) { %>

        init();<% } %>

        // *********************************************************************************
		// *** Controller Initialize
		// *********************************************************************************<% if (singlePageApp) { %>

        function init() {

            loadRecords(false);

        }<% } %><% if (tabPageApp) { %>

		function init(cacheController) {

            if (!cacheController) {
                // Carregando pela primeira vez
                loadRecords(false);
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

        function loadRecords(isMore) {

			var parameters = {},
                start = 0;

            // paginação
			self.recordsCount = 0;

			if (isMore) {
				start = self.records.length;
			} else {
				self.records = [];
			}

            // pesquisa
            if (self.disclaimers.length > 0) {
                parameters.property = [];
                parameters.value = [];

                angular.forEach(self.disclaimers, function (disclaimer) {
                    if (disclaimer.property && disclaimer.value) {
                        parameters.property.push(disclaimer.property);
                        parameters.value.push(disclaimer.value);
                    }
                });
            }

            parameters.start = start;
            parameters.limit = 10;

			customerFactory.findRecords(parameters, function (result) {
				if (result) {
					angular.forEach(result, function (value) {

						if (value && value.$length) {
							self.recordsCount = value.$length;
						}

						self.records.push(value);
					});
				} else {
                    self.records = [];
                    self.recordsCount = 0;
                }
			});
		}

        function search() {
            self.disclaimers = [];

            if (self.searchText) {
                addDisclaimer('name', '*' + self.searchText + '*', 'Pesquisa: ' + self.searchText);
            }

            self.loadRecords(false);
		}

        function openAdvancedSearch() {
			var modalInstance = $modal.open({
                templateUrl: '/js/customers/customers-search.view.html',
                controller: 'CustomerSearchController as controller',
                size: 'md',
                resolve: {
                    data: function () {
                        return angular.copy(advancedSearch);
                    }
                }
            });

            modalInstance.result.then(function (params) {
                advancedSearch = angular.copy(params)

                addDisclaimers();
            });
		}

        function addDisclaimer(property, value, label) {
            self.disclaimers.push({
                property: property,
                value: value,
                title: label
            });
        }

        function addDisclaimers() {

            var filter = angular.copy(advancedSearch),
                fnFormatDate = function (date) {

                return dateFilter(date, 'dd/MM/yyyy');
            }

            removeDisclaimers();

            if (filter.name) {
                addDisclaimer('name', '*' + filter.name + '*', 'Nome contém "' + filter.name + '"');
            }


            if (filter.address_street) {
                addDisclaimer('address_street', '*' + filter.address_street + '*', 'Endereço contém "' + filter.address_street + '"');
            }

            if (filter.doc_cpf) {
                addDisclaimer('doc_cpf', filter.doc_cpf, 'CPF igual a ' + filter.doc_cpf);
            }

            if (filter.birthday) {
                if (filter.birthday.startDate && filter.birthday.endDate) {
                    addDisclaimer(
                        'birthday',
                        filter.birthday.startDate.valueOf() + ';' + filter.birthday.endDate.valueOf(),
                        'Data de aniversário entre ' + fnFormatDate(filter.birthday.startDate) + ' e ' + fnFormatDate(filter.birthday.endDate)
                    );
                } else if (filter.birthday.startDate) {
                    addDisclaimer(
                        'birthday',
                        '>=' + filter.birthday.startDate.valueOf(),
                        'Data de criação incia em ' + fnFormatDate(filter.birthday.startDate)
                    );
                } else if (filter.birthday.endDate) {
                    addDisclaimer(
                        'birthday',
                        '<=' + filter.birthday.endDate.valueOf(),
                        'Data de criação final em ' + fnFormatDate(filter.birthday.endDate)
                    );
                }
            }

            self.loadRecords();
        }

        function removeDisclaimer(disclaimer) {
            // pesquisa e remove o disclaimer do array
            var index = self.disclaimers.indexOf(disclaimer);

            if (index !== -1) {
                self.disclaimers.splice(index, 1);
            }

            if (disclaimer.property === 'name') {
                self.searchText = '';
            }

            self.loadRecords();
        }

        function removeDisclaimers() {
            self.disclaimers = [];
        }

        function applyEdit(newValue, field, customer) {
            var update = {};

            if (newValue !== customer[field]) {
                update[field] = newValue;

                customerFactory.updateRecord(customer.id, update);
            }
        }

		function onRemove(record) {
            notification.question({
				title: 'l-question',
				text: i18nFilter('l-confirm-delete-operation'),
				cancelLabel: 'l-no',
				confirmLabel: 'l-yes',
				callback: function (isPositiveResult) {
                    var index;

					if (isPositiveResult) {
						customerFactory.deleteRecord(record.id, function (result) {
							if (result) {

								index = self.records.indexOf(record);

								if (index !== -1) {
									self.records.splice(index, 1);
									self.recordsCount -= 1;
								}
							}
						});
					}
				}
			});
		}
	};

}());
