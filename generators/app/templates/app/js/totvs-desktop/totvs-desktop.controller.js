/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsDesktop
* @name TotvsDesktopController
* @object controller
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires totvs-app.module
*
* @dependencies
*
* @description
*/

(function () {

    'use strict';

    angular
        .module('totvsDesktop')
        .controller('TotvsDesktopController', TotvsDesktopController);

    TotvsDesktopController.$inject = [
        '$timeout'<% if (singlePageApp) { %>,
        '$location',
        'i18nFilter',
        'totvsDesktopMenuRecents',
        'totvsDesktopMenuFavorites',
        'totvsDesktopMenuPrograms',
        'totvsDesktopMenuProcesses',
        'TotvsDesktopSidebar'<% } %><% if (tabPageApp) { %>,
        '$rootScope',
        '$scope',
        '$state',
        'TotvsDesktopViewService',
        'TotvsDesktopTabService'<% } %>
    ];

    function TotvsDesktopController(
        $timeout<% if (singlePageApp) { %>,
        $location,
        i18nFilter,
        totvsDesktopMenuRecents,
        totvsDesktopMenuFavorites,
        totvsDesktopMenuPrograms,
        totvsDesktopMenuProcesses,
        TotvsDesktopSidebar<% } %><% if (tabPageApp) { %>,
        $rootScope,
        $scope,
        $state,
        TotvsDesktopViewService,
        TotvsDesktopTabService<% } %>) {

        // *********************************************************************************
		// *** Variables
		// *********************************************************************************

        var self = this<% if (singlePageApp) { %>,
            menus = {
                recs: $('#recs'),
                favs: $('#favs'),
                apps: $('#apps'),
                prcs: $('#prcs')
            }<% } %><% if (tabPageApp) { %>,
            removeCurrentView = false<% } %>;

        // *********************************************************************************
		// *** Public Properties and Methods
		// *********************************************************************************

        <% if (tabPageApp) { %>self.tabs = [];
        <% } %>self.options = [];
        self.headerInformations = [];<% if (singlePageApp) { %>
        self.srcLogo = 'assets/img/totvs.png'; // TODO: Factory for logo
        self.selectedMenuGroup = undefined;
        self.recents = [];
        self.favorites = [];
        self.processes = [];
        self.applications = [];
        self.loadMenu = loadMenu;
        self.loadPrograms = loadPrograms;
        self.openMenuProgram = openMenuProgram;<% } %>

        init();

        // *********************************************************************************
		// *** Controller Initialize
		// *********************************************************************************

        function init() {<% if (tabPageApp) { %>

            self.tabs = TotvsDesktopTabService.addTab('Home', 'home.blank', {}, undefined, tabOnSelect);<% } %>

            self.options = [
                {title: 'Config', action: optionAction, icon:  'cfg'},
                {title: 'Help', action: optionAction, icon: 'hlp'},
                {title: 'Logoff', action: optionAction, icon: 'off'}
            ];

            // TODO: Load information of server
            self.headerInformations = [
                {label: 'TOTVS S/A', action: headerAction},
                {label: 'Usuário: Admin'},
                {label: 'TOTVS | HTML Framework - 12.1.12'}
            ];<% if (singlePageApp) { %>

            // Load List Menu Recents
            totvsDesktopMenuRecents.getProgramRecents(function (data) {
                self.recents = angular.copy(data);
            });

            // Load List Menu Favorites
            totvsDesktopMenuFavorites.getProgramFavorites(function (data) {
                self.favorites = angular.copy(data);
            });

            // Load List Menu Applications
            totvsDesktopMenuPrograms.getProgramApplications(function (data) {
                self.applications = data;
            });

            // Load List Menu Processes
            totvsDesktopMenuProcesses.getMenuProcesses(function (data) {
                self.processes = data;
            });

            self.selectedMenuGroup = 'favs';

            // Função para o Menu Responsivo
            TotvsDesktopSidebar.init();<% } %>

        }

        // *********************************************************************************
		// *** Functions
		// *********************************************************************************<% if (tabPageApp) { %>

        function tabOnClose(tab) {
            if (tab.view) {
                TotvsDesktopViewService.removeViewByName(tab.view);

                removeCurrentView = tab.view === TotvsDesktopViewService.getViewNameCurrentState($state);
            }
        }

        function tabOnSelect(tab) {
            if (tab.state) {
                $state.go(tab.state, tab.params);
            }
        }<% } %>

        function optionAction(option) {
            // TODO: Execute action for options
        }

        function headerAction(information) {
            // TODO: Execute action for header actions
        }<% if (singlePageApp) { %>

        function loadMenu(menu) {

            if (self.selectedMenuGroup === menu) {
                return;
            }

            angular.forEach(menus, function (itemMenu) {
                itemMenu.next().slideUp();
            });

            menus[menu].next().slideDown();

            self.selectedMenuGroup = menu;
        }

        function loadPrograms(app) {
            self.selectedApplication = app;

            if (!app) {
                return;
            }

            self.applications.forEach(function (application) {
                if (application.id !== app.id) {
                    $('#' + application.id).next().slideUp();
                }
            });

            $('#' + app.id).next().slideDown();
        }

        function openMenuProgram(program) {

            if (!program) {
                return;
            }

            $location.url(program.url);
			TotvsDesktopSidebar.close();
        }<% } %><% if (tabPageApp) { %>

        // *********************************************************************************
		// *** Listeners Broadcast
		// *********************************************************************************

        // states
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // Salva o estado do controller que está sendo destruido
            if ($state.current.name && !removeCurrentView) {
                TotvsDesktopViewService.addViewState($state, $state.href(fromState, fromParams))
            }

            removeCurrentView = false;
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // Verifica se o controller que está sendo carregado tem cache
            var viewController;

            $timeout(function() {
                viewController =
                    TotvsDesktopViewService.getViewControllerState($state, $state.href(toState, toParams));
                // Avisa o controller que o state finalizou a carga
                $scope.$broadcast('$totvsViewServiceInit', viewController ? viewController.controller : undefined);

                self.tabs = TotvsDesktopTabService.addTab(
                    toState.title, toState.name, toParams,
                    TotvsDesktopViewService.getViewNameCurrentState($state),
                    tabOnSelect, tabOnClose);
            });

        });<% } %>
    }

}());

