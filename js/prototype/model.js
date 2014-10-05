define(['utils'], function (utils) {

    //constructor helpers

    var //init model options
        initOptions = function (options) {
            options = options || {};
            this.app = options.app;
            this.defaults = this._defaults || {};
            this._userAttrsChange = [];
            this._validations = this._validations || [];
        },

        //listen model events
        initModelEvents = function () {
            _.each(this._modelEvents, function (actions, eventName) {
                this.on(eventName, onModelEvents.bind(this, actions));
            }, this);
        },

        //model events listener
        onModelEvents = function (actions) {
            this.runActions(actions);
        },

        //run initial services
        initialService = function () {
            _.each(this._initialService, function (service) {
                this.callService(service);
            }, this);
        },

        constructorModel = Backbone.Model;

    //extend model class

    Backbone.Model = constructorModel.extend({

        constructor: function (attributtes, options) {
            if (this instanceof Backbone.Model) {
                initOptions.call(this, options);
                constructorModel.apply(this, arguments);
                initModelEvents.call(this);
                initialService.call(this);
            }
        },

        //call ajax service
        callService: function (service) {
            var that = this;
            utils.services.run(service)
                .done(function (data) {
                    console.debug(service, data);
                });
        }

    });
});
