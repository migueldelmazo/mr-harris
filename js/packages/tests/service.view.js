define([
    'utils',
    'packages/tests/service.model',
    'packages/tests/service.i18n'
], function (utils, serviceModel, i18n) {

    return {

        _name: 'serviceView', //view name

        _template: '#service-view', //backbone template

        _i18n: i18n,

        _model: {
            model: serviceModel, //model of view
        },

        _domEvents: {
            'click [js="simple-service"]': [
                { action: 'runModelMethod', method: 'callServiceById', value: 'serviceTestOne' }
            ],
            'click [js="double-service"]': [
                { action: 'runModelMethod', method: 'callServiceById', value: 'serviceTestOne' },
                { action: 'runModelMethod', method: 'callServiceById', value: 'serviceTestOne' }
            ],
            'click [js="validate-and-parse-service"]': [
                { action: 'runModelMethod', method: 'callServiceById', value: 'serviceTestOneValidateAndParse' }
            ]
        }

    };
});