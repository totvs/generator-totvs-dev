/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module dashboard
* @name DashboardSettingsController
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
        .module('dashboard')
        .controller('DashboardSettingsController', DashboardSettingsController);

    DashboardSettingsController.$inject = [
        '$rootScope',
        '$state',
        'dashboardFactory',
        'totvs.app-notification.Service'
    ];

    function DashboardSettingsController($rootScope, $state, dashboardFactory, notification) {

        // *********************************************************************************
		// *** Variables
		// *********************************************************************************

        var self = this;

        // *********************************************************************************
		// *** Public Properties and Methods
		// *********************************************************************************

        self.dashboard = {};
        self.save = save;
        self.cancel = cancel;
        self.remove = remove;
        self.up = up;
        self.down = down;
        self.changesize = changesize;
        self.onDropPortletComplete = onDropPortletComplete;
        self.removeDradIZIndex = removeDradIZIndex;

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

        function save() {
            dashboardFactory.save(self.dashboard, function () {
                notification.notify({
                    type: 'success',
                    title: 'Dashboard',
                    detail: self.dashboard.header + ' foi salvo com sucesso!'
                });

                $state.go('dashboard.start');
            });
        }

        function cancel() {
            notification.question({
                title: 'l-question',
                text: 'Deseja cancelar a alteração?',
                cancelLabel: 'l-no',
                confirmLabel: 'l-yes',
                callback: function (isPositiveResult) {
                    if (isPositiveResult) {
                        $state.go('dashboard.start');
                    }
                }
            });
        }

        function remove(index) {
            self.dashboard.widgets.splice(index, 1);
            self.removeDradIZIndex();
        }

        function up(index) {

            if (index < 0) {
                return;
            }

            self.dashboard.widgets.splice(index - 1, 0, angular.copy(self.dashboard.widgets[index]));
            self.dashboard.widgets.splice(index + 1, 1);

            self.removeDradIZIndex();
        }

        function down(index) {

            if (index + 1 >= self.dashboard.widgets.length) {
                return;
            }

            self.dashboard.widgets.splice(index + 2, 0, angular.copy(self.dashboard.widgets[index]));
            self.dashboard.widgets.splice(index, 1);

            self.removeDradIZIndex();
        }

        function changesize(index) {
            var widget = self.dashboard.widgets[index];

            widget.size = widget.size === 'half' ? 'full' : 'half';

            self.dashboard.widgets[index] = angular.copy(widget);

            self.removeDradIZIndex();
        }

        function onDropPortletComplete(indexTarget, source) {
            var temp,
                sourceIndex = self.dashboard.widgets.indexOf(source);

            temp = angular.copy(self.dashboard.widgets[indexTarget]);

            self.dashboard.widgets[indexTarget] = angular.copy(source);
            self.dashboard.widgets[sourceIndex] = angular.copy(temp);

            self.removeDradIZIndex();
        }

        function removeDradIZIndex() {
            $('.dashboard-drag-zindex').each(function (index, value) {
                $(this).removeClass('dashboard-drag-zindex');
            });
        }

        $rootScope.$on('draggable:move', function (data, obj) {
            $(obj.element).addClass('dashboard-drag-zindex');
        });

        $rootScope.$on('draggable:end', function (data, obj) {
            self.removeDradIZIndex();
        });
    }

}());
