/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module widget
* @name WidgetPieController
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
        .module('widget')
        .controller('WidgetPieController', WidgetPieController);

    WidgetPieController.$inject = [];

    function WidgetPieController() {

        // *********************************************************************************
		// *** Variables
		// *********************************************************************************

        var self = this;

        // *********************************************************************************
		// *** Public Properties and Methods
		// *********************************************************************************

        self.series = [];
        self.setFnExport = setFnExport;

        init();

        // *********************************************************************************
		// *** Controller Initialize
		// *********************************************************************************

        function init() {
            self.series = [{
                data: [
                    {category: "Exemplo #1", value: 150, color: "#1E90FF"},
                    {category: "Exemplo #2", value: 300, color: "#87CEFA"}
                ]
            }];
        }

        // *********************************************************************************
		// *** Functions
		// *********************************************************************************

        function setFnExport(obj) {
            self.exportToPdf = obj.pdf;
            self.exportToPng = obj.png;
        }
    }

}());
