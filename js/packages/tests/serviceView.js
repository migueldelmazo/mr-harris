define([
    'utils',
    'packages/tests/serviceModel'
], function (utils, serviceModel) {

    return {

        _name: 'serviceView', //view name

        _template: '#service-view', //backbone template

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