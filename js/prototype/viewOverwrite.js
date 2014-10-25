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
        },

        onDestroy: function () {
            utils.foo(this, 'onDestroyStoreModel');
        }

    });

    _.extend(Marionette.LayoutView.prototype, {

        serializeData: function () {
            var modelData = (this._modelInstance) ? this._modelInstance.toJSON() : {},
                i18nData = { i18n: this._i18n || {}};
            return $.extend(true, modelData, i18nData);
        }

    });
});