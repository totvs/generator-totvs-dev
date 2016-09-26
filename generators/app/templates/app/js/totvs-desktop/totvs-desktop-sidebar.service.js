/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsDesktop
* @name TotvsDesktoSidebar
* @object service
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
        .module('totvsDesktop')
        .service('TotvsDesktopSidebar', TotvsDesktopSidebar);

    TotvsDesktopSidebar.$inject = [];

    function TotvsDesktopSidebar() {
        var isOpened;

        this.init = init;
        this.open = openMenu;
        this.close = closeMenu;

        function init() {
            if (window.innerWidth < 768) {
				var menuw = document.getElementById('menu-workspace'),
                    body = $('body'),
                    btbHome = '.btn-home';

				isOpened = false;
                <% if (tabPageApp) { %>
                body.off('click', btbHome);<% } %>
				body.on('click', btbHome, openMenu);
				menuw.addEventListener('click', closeMenu);
            }
        }

        function openMenu() {
            if (isOpened !== undefined && !isOpened) {
                var menuLateral = document.getElementById('menu-lateral');
                if (menuLateral) {
                    menuLateral.style.width = '250px';
                    document.getElementById('menu-workspace').style.marginLeft = '260px';
                    document.getElementById('menu-desktop').style.overflow = 'hidden';
                    isOpened = !isOpened;
                }
            } else { closeMenu(); }
        }

        function closeMenu() {
            if (isOpened !== undefined && isOpened) {
                var menuLateral = document.getElementById('menu-lateral');
                if (menuLateral) {
                    menuLateral.style.width = '0';
                    document.getElementById('menu-workspace').style.marginLeft = '0';
                    document.getElementById('menu-desktop').style.overflow = 'auto';
                    isOpened = !isOpened;
                }
            }
        }
	}
}());
