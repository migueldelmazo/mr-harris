define(['utils'], function (utils) {

    //constructor helpers

    var initAppView = function () {
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
                constructorApplication.apply(this, arguments);
                this.start();
                initAppView.call(this);
                utils.foo(this, '_initAppEvents');
                utils.foo(this, '_initRouter');
            }
        },

        getAppView: function () {
            return this.appView;
        },

        onError: function () {
            this.appView.destroy();
        }

    });
});
