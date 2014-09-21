define(['utils'], function (utils) {

    //constructor helpers

    var initHistory = function () {
            Backbone.history.start();
        },

        navigateToStart = function () {
            this.navigate(utils.config.get('appStartHash') || Backbone.history.fragment || utils.config.get('appHomeHash') || '');
        },

        initAppView = function () {
            this.addInitializer(function () {
                this.appView = utils.classes.instance('layout', this.appView, { app: this });
                this.appView.render();
            });
        },

        constructorApplication = Marionette.Application;

    //extend application class

    Marionette.Application = constructorApplication.extend({

        constructor: function () {
            if (this instanceof Marionette.Application) {
                utils.config.set('app', this);
                initHistory.call(this);
                navigateToStart.call(this);
                constructorApplication.apply(this, arguments);
                initAppView.call(this);
                utils.foo(this, '_initAppEvents');
                this.start();
            }
        },

        getAppView: function () {
            return this.appView;
        }

    });
});
