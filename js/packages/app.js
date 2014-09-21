define([
    'utils',
    'packages/appConfig',
    'packages/appView',
    'prototype/application',
    'prototype/applicationEvents',
    'prototype/applicationNavigate',
    'prototype/model',
    'prototype/modelActions',
    'prototype/modelCommunication',
    'prototype/modelSet',
    'prototype/modelValidations',
    'prototype/modelValidationsMethods',
    'prototype/view',
    'prototype/viewActions',
    'prototype/viewCommunication',
    'prototype/viewEvents',
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
            utils.classes.create('itemView', Marionette.ItemView);
            utils.classes.create('layout', Marionette.LayoutView);
            utils.classes.create('model', Backbone.Model);
        },

        //require test and instance application
        initApp = function () {
            utils.tests.requireTestFiles().done(function () {
                window.z_app = new Marionette.Application({ appView: appView });
            });
        };

    //main marionette application file: load prototypes and start applicacion

    return function (requireConfig) {
        setConfig(requireConfig);
        createOwnClasses();
        initApp();
    };

});