define(['utils'], function (utils) {

    //constructor helpers

    var //init model options
        initOptions = function (options) {
            options = options || {};
            this.app = options.app;
            this._appEvents = this._appEvents || {};
            this._services = this._services || [];
            this._serviceInProgress = [];
            this._userAttrsChange = [];
            this._validations = this._validations || [];
            getDefaultsAttrs.call(this, options);
        },

        getDefaultsAttrs = function (options) {
            this.defaults = utils.storage.appInstanceGet('model:' + options.viewName + ':' +this._name) || this._defaults || {};
        },

        //events

        listenEvents = function () {
            //model events
            _.each(this._modelEvents, function (actions, eventName) {
                this.listenTo(this, eventName, onModelEvents.bind(this, actions));
            }, this);
            //app events
            _.each(this._appEvents, function (actions, eventName) {
                this.listenTo(this.app.channel, eventName, onModelEvents.bind(this, actions));
            }, this);
        },

        stopListeningEvents = function () {
            //model events
            _.each(this._appEvents, function (actions, eventName) {
                this.stopListening(this);
            }, this);
            //app events
            _.each(this._appEvents, function (actions, eventName) {
                this.stopListening(this.app.channel);
            }, this);
        },

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
                listenEvents.call(this);
                utils.foo(this, 'initServices');
            }
        },

        close: function () {
            stopListeningEvents.call(this);
            this.destroy();
        }

    });
});
