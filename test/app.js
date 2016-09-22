'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-totvs-dev:app', function () {

    var configFiles = [
            '.editorconfig',
            '.bowerrc',
            'bower.json',
            '.gitignore',
            '.jshintrc',
            '.jscsrc',
            'package.json'
        ],

        appFiles = [
            'src/app/index.html',
            'src/app/js/totvs-app.module.js',
            'src/app/js/totvs-app.config.js',
            'src/app/js/totvs-app.route.js'
        ],

        assetsFiles = [
            'src/app/assets/css/app.less',
            'src/app/assets/css/app.min.css',
            'src/app/assets/img/favicon.ico',
            'src/app/assets/img/loading.gif',
            'src/app/assets/img/totvs.png',
            'src/app/assets/img/icon-home.png',
            'src/app/assets/img/icon-help.png',
            'src/app/assets/img/icon-cfg.png',
            'src/app/assets/img/icon-off.png'
        ],

        desktopFiles = [
            'src/app/js/totvs-desktop/totvs-desktop.module.js',
            'src/app/js/totvs-desktop/totvs-desktop.controller.js',
            'src/app/js/totvs-desktop/totvs-desktop-header.directive.js',
            'src/app/js/totvs-desktop/totvs-desktop-tab.directive.js',
        ],

        desktopSpaFiles = [
            'src/app/js/totvs-desktop/totvs-desktop-menu-favorites.factory.js',
            'src/app/js/totvs-desktop/totvs-desktop-menu-processes.factory.js',
            'src/app/js/totvs-desktop/totvs-desktop-menu-programs.factory.js',
            'src/app/js/totvs-desktop/totvs-desktop-menu-recents.factory.js'
        ],

        desktopTabFiles = [
            'src/app/js/totvs-desktop/totvs-desktop-tab.service.js',
            'src/app/js/totvs-desktop/totvs-desktop-view.service.js'
        ],

        menuFiles = [
            'src/app/js/totvs-menu/totvs-menu-favorites.factory.js',
            'src/app/js/totvs-menu/totvs-menu-processes.factory.js',
            'src/app/js/totvs-menu/totvs-menu-programs.factory.js',
            'src/app/js/totvs-menu/totvs-menu-recents.factory.js',
            'src/app/js/totvs-menu/totvs-menu.constant.js',
            'src/app/js/totvs-menu/totvs-menu.controller.js',
            'src/app/js/totvs-menu/totvs-menu.module.js',
            'src/app/js/totvs-menu/totvs-menu.view.html'
        ],

        sampleCRUDFiles = [
            'src/app/js/customers/customers-detail.controller.js',
            'src/app/js/customers/customers-detail.view.html',
            'src/app/js/customers/customers-edit.controller.js',
            'src/app/js/customers/customers-edit.view.html',
            'src/app/js/customers/customers-list.controller.js',
            'src/app/js/customers/customers-list.view.html',
            'src/app/js/customers/customers-search.controller.js',
            'src/app/js/customers/customers-search.view.html',
            'src/app/js/customers/customers.factory.js',
            'src/app/js/customers/customers.module.js',
            'src/app/js/customers/customers.route.js',
            'src/app/js/customers/i18n/translations.js'
        ],

        sampleDashboardFiles = [
            'src/app/js/dashboard/dashboard-settings.controller.js',
            'src/app/js/dashboard/dashboard-settings.view.html',
            'src/app/js/dashboard/dashboard.controller.js',
            'src/app/js/dashboard/dashboard.factory.js',
            'src/app/js/dashboard/dashboard.module.js',
            'src/app/js/dashboard/dashboard.route.js',
            'src/app/js/dashboard/dashboard.view.html',
            'src/app/js/dashboard/widgets/widget-area.controller.js',
            'src/app/js/dashboard/widgets/widget-area.view.html',
            'src/app/js/dashboard/widgets/widget-pie.controller.js',
            'src/app/js/dashboard/widgets/widget-pie.view.html',
            'src/app/js/dashboard/widgets/widget-table.controller.js',
            'src/app/js/dashboard/widgets/widget-table.view.html',
            'src/app/js/dashboard/widgets/widget.module.js',
            'src/app/js/dashboard/assets/css/dashboard.style.css',
            'src/app/js/dashboard/i18n/translations.js'
        ];

    describe('Default answers', function() {

        before(function () {
            return helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({})
                .toPromise();
        });

        it('Creates files config', function () {
            assert.file(configFiles);
        });

        it('Creates files app', function () {
            assert.file(appFiles);
        });

        it('Creates files assets', function () {
            assert.file(assetsFiles);
        });

        it('Creates files i18n', function () {
            assert.file([
                'src/app/i18n/translations.js'
            ]);
        });

        it('Creates files desktop', function () {
            assert.file(desktopFiles);
        });

        it('Create files SPA', function () {
            assert.file(desktopSpaFiles);
        });

        it('No creates files menu', function () {
            assert.noFile(menuFiles);
        });

        it('Creates files Sample CRUD', function () {
            assert.file(sampleCRUDFiles);
        });

        it('Creates files Sample Dashboard', function () {
            assert.file(sampleDashboardFiles);
        });

    });

    describe('Create Single Page Application', function() {

        before(function () {
            return helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({singlePageApp: true, tabPageApp: false})
                .toPromise();
        });

        it('Create files SPA', function () {
            assert.file(desktopSpaFiles);
        });

        it('No creates files menu', function () {
            assert.noFile(menuFiles);
        });

        it('No creates files Tab', function () {
            assert.noFile(desktopTabFiles);
        });

    });

    describe('Create Tab Page Application', function() {

        before(function () {
            return helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({tabPageApp: true, singlePageApp: false})
                .toPromise();
        });

        it('Create files Tab', function () {
            assert.file(desktopTabFiles);
        });

        it('Creates files menu', function () {
            assert.file(menuFiles);
        });

        it('No creates files SPA', function () {
            assert.noFile(desktopSpaFiles);
        });

    });

    /*describe('no UI Router', function() {

        before(function () {
            return helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({})
                .toPromise();
        });

        assert.fileContent('src/app/index.html', 'angular');
    });*/

    describe('No Samples', function() {

        before(function () {
            return helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({samples: []})
                .toPromise();
        });

        it('No creates files CRUD', function () {
            assert.noFile(sampleCRUDFiles);
        });

        it('No creates files Dashboard', function () {
            assert.noFile(sampleDashboardFiles);
        });

    });
});
