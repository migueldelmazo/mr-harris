define(['utils'], function (utils) {

    //constructor helpers

    var //init model options
        initOptions = function (options) {
            options = options || {};
            this.app = options.app;
            this.defaults = this._defaults || {};
            this._userAttrsChange = [];
            this._validations = this._validations || [];
            this._services = this._services || [];
            this._serviceInProgress = [];
        },

        //listen model events
        initModelEvents = function () {
            _.each(this._modelEvents, function (actions, eventName) {
                this.on(eventName, onModelEvents.bind(this, actions));
            }, this);
        },

        //model events listener
        onModelEvents = function () {
            this.runActions.apply(this, utils.sliceArguments(arguments));
        },

        constructorModel = Backbone.Model;

    //extend model class

    Backbone.Model = constructorModel.extend({

        constructor: function (attributtes, options) {
            if (this instanceof Backbone.Model) {
                initOptions.call(this, options);
                constructorModel.apply(this, arguments);
                initModelEvents.call(this);
                utils.foo(this, 'initServices');
            }
        }

    });
});
