'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var lodash = require('lodash');

module.exports = yeoman.Base.extend({

    initializing: function () {
        var currentDate = (new Date()).toLocaleDateString();

        this.props = {
            currentDate: currentDate,
            useRequireJS: false,
            useCDN: false,
            useUIRouter: true,
            minification: true
        };
    },

    prompting: function () {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: 'totvs-menu-html'
        },{
            type: 'input',
            name: 'title',
            message: 'Project title',
            default: 'Sample Menu HTML'
        },{
            type: 'input',
            name: 'description',
            message: 'Project description',
            default: 'TOTVS | Sample Menu HTML'
        },{
            type: 'input',
            name: 'version',
            message: 'Current version',
            default: '0.1.0'
        },{
            type: 'input',
            name: 'repository',
            message: 'Repository'
        },{
            type: 'input',
            name: 'homepage',
            message: 'Home page',
            default: 'www.totvs.com'
        },{
            type: 'confirm',
            name: 'singlePageApp',
            message: 'Single Page Application',
            default: true
        /*},{
            type: 'confirm',
            name: 'useRequireJS',
            message: 'Use RequireJS',
            default: false
        },{
            type: 'confirm',
            name: 'useCDN',
            message: 'Use CDN (https://cdnjs.com)',
            default: false
        },{
            type: 'confirm',
            name: 'useUIRouter',
            message: 'Use Angular UI Router',
            default: true
        },{
            type: 'confirm',
            name: 'minification',
            message: 'Use minification file',
            default: false*/
        },{
            type: 'checkbox',
            name: 'samples',
            message: 'Create samples',
            choices: ['CRUD', 'Dashboard'],
            default: ['CRUD', 'Dashboard']
        },{
            type: 'input',
            name: 'proxy',
            message: 'Proxy for install dependencies'
        }]).then(function (answers) {
            //console.log(answers);

            this.props.name = answers.name;
            this.props.title = answers.title;
            this.props.description = answers.description;
            this.props.version = answers.version;
            this.props.repository = answers.repository;
            this.props.homepage = answers.homepage;
            this.props.singlePageApp = answers.singlePageApp;
            this.props.tabPageApp = !answers.singlePageApp;
            /*this.props.useRequireJS = answers.useRequireJS;
            this.props.useCDN = answers.useCDN;
            this.props.useUIRouter = answers.useUIRouter;
            this.props.minification = answers.minification;*/
            this.props.createCRUD = answers.samples.indexOf('CRUD') >= 0;
            this.props.createDashboard = answers.samples.indexOf('Dashboard') >= 0;

            this.props.proxy = answers.proxy;
            this.props.useProxy = Boolean(this.props.proxy);

        }.bind(this));
    },

    writing: {
        config: function() {
            // Editor Config
            this.fs.copy(this.templatePath('_.editorconfig'), this.destinationPath('.editorconfig'));
            //Bower
            this.fs.copyTpl(this.templatePath('_.bowerrc'), this.destinationPath('.bowerrc'), this.props);
            this.fs.copyTpl(this.templatePath('_bower.json'), this.destinationPath('bower.json'), this.props);
            // Git
            this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'));
            // JSHint e JSLint
            this.fs.copy(this.templatePath('_.jshintrc'), this.destinationPath('.jshintrc'));
            this.fs.copy(this.templatePath('_.jscsrc'), this.destinationPath('.jscsrc'));
            // NodeJS
            this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.props);
        },
        assets: function() {
            this.fs.copy(
                this.templatePath('app/assets/css/app.less'),
                this.destinationPath('src/app/assets/css/app.less')
            );
            this.fs.copy(
                this.templatePath('app/assets/css/app.css'),
                this.destinationPath('src/app/assets/css/app.css')
            );
            this.fs.copy(
                this.templatePath('app/assets/img/favicon.ico'),
                this.destinationPath('src/app/assets/img/favicon.ico')
            );
            this.fs.copy(
                this.templatePath('app/assets/img/loading.gif'),
                this.destinationPath('src/app/assets/img/loading.gif')
            );
            this.fs.copy(
                this.templatePath('app/assets/img/totvs.png'),
                this.destinationPath('src/app/assets/img/totvs.png')
            );
            this.fs.copy(
                this.templatePath('app/assets/img/icon-home.png'),
                this.destinationPath('src/app/assets/img/icon-home.png')
            );
            this.fs.copy(
                this.templatePath('app/assets/img/icon-help.png'),
                this.destinationPath('src/app/assets/img/icon-help.png')
            );
            this.fs.copy(
                this.templatePath('app/assets/img/icon-cfg.png'),
                this.destinationPath('src/app/assets/img/icon-cfg.png')
            );
            this.fs.copy(
                this.templatePath('app/assets/img/icon-off.png'),
                this.destinationPath('src/app/assets/img/icon-off.png')
            );
        },
        i18n: function() {
            this.fs.copy(
                this.templatePath('app/i18n/translations.js'),
                this.destinationPath('src/app/i18n/translations.js')
            );
        },
        app: function() {
            // App
            this.fs.copyTpl(
                this.templatePath('app/index.html'), this.destinationPath('src/app/index.html'), this.props);
            this.fs.copyTpl(
                this.templatePath('app/js/totvs-app.module.js'),
                this.destinationPath('src/app/js/totvs-app.module.js'),
                this.props
            );
            this.fs.copyTpl(
                this.templatePath('app/js/totvs-app.config.js'),
                this.destinationPath('src/app/js/totvs-app.config.js'),
                this.props
            );
            this.fs.copyTpl(
                this.templatePath('app/js/totvs-app.route.js'),
                this.destinationPath('src/app/js/totvs-app.route.js'),
                this.props
            );
        },
        desktop: function() {
            // Desktop
            this.fs.copyTpl(
                this.templatePath('app/js/totvs-desktop/totvs-desktop.module.js'),
                this.destinationPath('src/app/js/totvs-desktop/totvs-desktop.module.js'),
                this.props
            );
            this.fs.copyTpl(
                this.templatePath('app/js/totvs-desktop/totvs-desktop.controller.js'),
                this.destinationPath('src/app/js/totvs-desktop/totvs-desktop.controller.js'),
                this.props
            );
            this.fs.copyTpl(
                this.templatePath('app/js/totvs-desktop/totvs-desktop-header.directive.js'),
                this.destinationPath('src/app/js/totvs-desktop/totvs-desktop-header.directive.js'),
                this.props
            );
            if (this.props.singlePageApp) {
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-desktop/totvs-desktop-menu-favorites.factory.js'),
                    this.destinationPath('src/app/js/totvs-desktop/totvs-desktop-menu-favorites.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-desktop/totvs-desktop-menu-processes.factory.js'),
                    this.destinationPath('src/app/js/totvs-desktop/totvs-desktop-menu-processes.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-desktop/totvs-desktop-menu-programs.factory.js'),
                    this.destinationPath('src/app/js/totvs-desktop/totvs-desktop-menu-programs.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-desktop/totvs-desktop-menu-recents.factory.js'),
                    this.destinationPath('src/app/js/totvs-desktop/totvs-desktop-menu-recents.factory.js'),
                    this.props
                );
            }
            this.fs.copyTpl(
                this.templatePath('app/js/totvs-desktop/totvs-desktop-tab.directive.js'),
                this.destinationPath('src/app/js/totvs-desktop/totvs-desktop-tab.directive.js'),
                this.props
            );
            if (this.props.tabPageApp) {
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-desktop/totvs-desktop-tab.service.js'),
                    this.destinationPath('src/app/js/totvs-desktop/totvs-desktop-tab.service.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-desktop/totvs-desktop-view.service.js'),
                    this.destinationPath('src/app/js/totvs-desktop/totvs-desktop-view.service.js'),
                    this.props
                );
            }
        },
        menu: function() {
            // Menu
            if (this.props.tabPageApp) {
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-menu/totvs-menu-favorites.factory.js'),
                    this.destinationPath('src/app/js/totvs-menu/totvs-menu-favorites.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-menu/totvs-menu-processes.factory.js'),
                    this.destinationPath('src/app/js/totvs-menu/totvs-menu-processes.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-menu/totvs-menu-programs.factory.js'),
                    this.destinationPath('src/app/js/totvs-menu/totvs-menu-programs.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-menu/totvs-menu-recents.factory.js'),
                    this.destinationPath('src/app/js/totvs-menu/totvs-menu-recents.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-menu/totvs-menu.constant.js'),
                    this.destinationPath('src/app/js/totvs-menu/totvs-menu.constant.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-menu/totvs-menu.controller.js'),
                    this.destinationPath('src/app/js/totvs-menu/totvs-menu.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-menu/totvs-menu.module.js'),
                    this.destinationPath('src/app/js/totvs-menu/totvs-menu.module.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/totvs-menu/totvs-menu.view.html'),
                    this.destinationPath('src/app/js/totvs-menu/totvs-menu.view.html'),
                    this.props
                );
            }
        },
        dashboard: function() {
            if (this.props.createDashboard) {
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/dashboard-settings.controller.js'),
                    this.destinationPath('src/app/js/dashboard/dashboard-settings.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/dashboard-settings.view.html'),
                    this.destinationPath('src/app/js/dashboard/dashboard-settings.view.html'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/dashboard.controller.js'),
                    this.destinationPath('src/app/js/dashboard/dashboard.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/dashboard.factory.js'),
                    this.destinationPath('src/app/js/dashboard/dashboard.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/dashboard.module.js'),
                    this.destinationPath('src/app/js/dashboard/dashboard.module.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/dashboard.route.js'),
                    this.destinationPath('src/app/js/dashboard/dashboard.route.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/dashboard.view.html'),
                    this.destinationPath('src/app/js/dashboard/dashboard.view.html'),
                    this.props
                );

                // Widgets
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/widgets/widget-area.controller.js'),
                    this.destinationPath('src/app/js/dashboard/widgets/widget-area.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/widgets/widget-area.view.html'),
                    this.destinationPath('src/app/js/dashboard/widgets/widget-area.view.html'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/widgets/widget-pie.controller.js'),
                    this.destinationPath('src/app/js/dashboard/widgets/widget-pie.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/widgets/widget-pie.view.html'),
                    this.destinationPath('src/app/js/dashboard/widgets/widget-pie.view.html'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/widgets/widget-table.controller.js'),
                    this.destinationPath('src/app/js/dashboard/widgets/widget-table.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/widgets/widget-table.view.html'),
                    this.destinationPath('src/app/js/dashboard/widgets/widget-table.view.html'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/widgets/widget.module.js'),
                    this.destinationPath('src/app/js/dashboard/widgets/widget.module.js'),
                    this.props
                );
                // Assets
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/assets/css/dashboard.style.css'),
                    this.destinationPath('src/app/js/dashboard/assets/css/dashboard.style.css'),
                    this.props
                );
                // i18n
                this.fs.copyTpl(
                    this.templatePath('app/js/dashboard/i18n/translations.js'),
                    this.destinationPath('src/app/js/dashboard/i18n/translations.js'),
                    this.props
                );
            }
        },
        customers: function() {
            if (this.props.createCRUD) {
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers-detail.controller.js'),
                    this.destinationPath('src/app/js/customers/customers-detail.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers-detail.view.html'),
                    this.destinationPath('src/app/js/customers/customers-detail.view.html'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers-edit.controller.js'),
                    this.destinationPath('src/app/js/customers/customers-edit.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers-edit.view.html'),
                    this.destinationPath('src/app/js/customers/customers-edit.view.html'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers-list.controller.js'),
                    this.destinationPath('src/app/js/customers/customers-list.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers-list.view.html'),
                    this.destinationPath('src/app/js/customers/customers-list.view.html'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers-search.controller.js'),
                    this.destinationPath('src/app/js/customers/customers-search.controller.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers-search.view.html'),
                    this.destinationPath('src/app/js/customers/customers-search.view.html'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers.factory.js'),
                    this.destinationPath('src/app/js/customers/customers.factory.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers.module.js'),
                    this.destinationPath('src/app/js/customers/customers.module.js'),
                    this.props
                );
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/customers.route.js'),
                    this.destinationPath('src/app/js/customers/customers.route.js'),
                    this.props
                );
                // i18n
                this.fs.copyTpl(
                    this.templatePath('app/js/customers/i18n/translations.js'),
                    this.destinationPath('src/app/js/customers/i18n/translations.js'),
                    this.props
                );
            }
        },
        // compilar LESS
        //Install Dependencies
        install: function() {
            this.installDependencies();
        }
    }

});
