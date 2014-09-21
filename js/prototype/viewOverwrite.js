define(['utils'], function (utils) {

    //extend view class

    _.extend(Backbone.View.prototype, {

        onBeforeShow: function (options) {
            utils.foo(this, 'clearIntervals');
            utils.foo(this, 'clearTimeouts');
            utils.foo(this, '_onBeforeShow', undefined, options);
        },

        onRender: function (options) {
            utils.foo(this, '_showInitialViewsInRegions');
            utils.foo(this, '_onRender', undefined, options);
        }

    });
});