(function () {

    'use strict';

    angular
        .module('totvsDesktop')
        .service('TotvsDesktopSidebar', TotvsDesktopSidebar);

    TotvsDesktopSidebar.$inject = [];

    function TotvsDesktopSidebar() {
        this.init = init;

        function init() {
            if (window.innerWidth < 768) {
                setTimeout(function () {
                    var menuw, home;
                    menuw = document.getElementById('menu-workspace');
                    home = document.getElementById('home');

                    $('body').on('click', '.btn-home', openMenu);
                    menuw.addEventListener('click', closeMenu);
                }, 300);

                function openMenu() {
                    document.getElementById('menu-lateral').style.width = '250px';
                    document.getElementById('menu-workspace').style.marginLeft = '260px';
                    document.getElementById('menu-desktop').style.overflow = 'hidden';
                }

                function closeMenu() {
                    document.getElementById('menu-lateral').style.width = '0';
                    document.getElementById('menu-workspace').style.marginLeft = '0';
                    document.getElementById('menu-desktop').style.overflow = 'auto';
                }
            }
        }
	}
}());
