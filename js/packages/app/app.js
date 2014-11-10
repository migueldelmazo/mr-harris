define([
    'utils',
    'packages/app/app.config',
    'packages/app/app.view',
    'prototype/app',
    'prototype/appController',
    'prototype/appEvents',
    'prototype/appNavigate',
    'prototype/appRouter',
    'prototype/controller',
    'prototype/controllerActions',
    'prototype/model',
    'prototype/modelActions',
    'prototype/modelCommunication',
    'prototype/modelService',
    'prototype/modelSet',
    'prototype/modelValidations',
    'prototype/modelValidationsMethods',
    'prototype/regionController',
    'prototype/view',
    'prototype/viewActions',
    'prototype/viewCommunication',
    'prototype/viewEvents',
    'prototype/viewI18n',
    'prototype/viewModel',
    'prototype/viewModelValidations',
    'prototype/viewOverwrite',
    'prototype/viewRegions',
    'prototype/viewUtils'
], function (utils, appConfig, appView) {

    var //set config mixing app and user config
        setConfig = function (requireConfig) {
            utils.config.set(appConfig);
            utils.config.set(requireConfig);
        },

        //create and store own classes
        createOwnClasses = function () {
            utils.classes.create('controller', Marionette.Controller);
            utils.classes.create('itemView', Marionette.ItemView);
            utils.classes.create('layout', Marionette.LayoutView);
            utils.classes.create('model', Backbone.Model);
        },

        //require test and instance application
        initApp = function () {
            utils.tests.requireTestFiles().done(function () {
                window.z_app = new Marionette.Application({
                    appView: appView
                });
            });
        };

    //main marionette application file: load prototypes and start applicacion

    return function (requireConfig) {
        setConfig(requireConfig);
        createOwnClasses();
        initApp();
    };

});