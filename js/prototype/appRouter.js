define(['utils'], function (utils) {

    //constructor helpers

    var storeApp = function () {
        this.app = utils.config.get('app');
    },

    constructorAppRouter = Marionette.AppRouter;

    //extend application class

    Marionette.AppRouter = constructorAppRouter.extend({

        constructor: function (options) {
            if (this instanceof Marionette.AppRouter) {
                storeApp.call(this);
                constructorAppRouter.apply(this, arguments);
            }
        }

    });
});
