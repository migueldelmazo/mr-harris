define(['utils'], function (utils) {

    //constructor helpers

    var initOptions = function (options) {
            options = options || {};
            this.app = options.app;
            this.defaults = this._defaults || {};
            this._userAttrsChange = [];
            this._validations = this._validations || [];
        },

        initModelEvents = function () {
            _.each(utils.foo(this, '_modelEvents'), function (actions, eventName) {
                this.on(eventName, onModelEvents.bind(this, actions));
            }, this);
        },

        onModelEvents = function (actions) {
            this.runActions(actions);
        },

        constructorModel = Backbone.Model;

    //extend model class

    Backbone.Model = constructorModel.extend({

        constructor: function (attributtes, options) {
            if (this instanceof Backbone.Model) {
                initOptions.call(this, options);
                constructorModel.apply(this, arguments);
                initModelEvents.call(this);
            }
        }

    });
});
