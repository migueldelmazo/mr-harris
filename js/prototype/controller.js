define(['utils'], function (utils) {

    var parseOptions = function  (options) {
            this.app = options.app;
            this.id = options.id;
            this.parentView = options.parentView;
            this.region = options.region;
            this.regionName = options.regionName;
        },

        constructorController = Marionette.Controller;

    Marionette.Controller = constructorController.extend({

        constructor: function (isPackageController, options) {
            if (isPackageController) {
                parseOptions.call(this, options);
            }
            constructorController.apply(this, arguments);
        },

        evalEvent: function (ev, options) {
            var actions = _.find(this.events, function (actions, eventName) {
                return eventName === ev;
            }) || [];
            this.runActions(actions, options);
        }

    });
});