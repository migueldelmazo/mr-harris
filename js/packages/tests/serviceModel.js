define([
    'utils',
    'services/serviceTestOne'
], function (utils, serviceTestOne) {

    return {

        _name: 'serviceModel', //model name

        _services: [
            {
                id: 'serviceTestOne',
                service: serviceTestOne,
                method: 'getServiceTestOne',
                params: { code: 1 },
                setModelAttr: 'serviceTestOne'
            }
        ],

        _modelEvents: { //model events actions
            'serviceInProgress:serviceTestOne': [
                { action: 'runModelMethod', method: 'onServiceProgressProducts' }
            ],
            'serviceInProgress': [
                { action: 'runModelMethod', method: 'onServiceProgress' }
            ]
        },

        onServiceProgressProducts: function (state) {
            //console.debug('onServiceProgressProducts:', state);
        },

        onServiceProgress: function (state) {
            //console.debug('onServiceProgress:', state);
        },

        submitSimpleService: function () {
            this.callServiceById('serviceTestOne');
        }
    };

});