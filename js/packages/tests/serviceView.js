define([
    'utils',
    'packages/tests/serviceModel'
], function (utils, serviceModel) {

    return {

        _name: 'serviceView', //view name

        _template: '#service-view', //backbone template

        _model: serviceModel, //model of view

        _domEvents: {
            'click [js="simple-service"]': [
                { action: 'runModelMethod', method: 'submitSimpleService' }
            ]
        }

    };
});