define(['utils'], function (utils) {

    //constructors helpers

    var initOptions = function (options) {
            options = options || {};
            this.app = options.app;
            this.el = this._el;
            this.template = this._template;
            this._intervalsIds = [];
            this._appEvents = this._appEvents || {};
            this._domEvents = this._domEvents || {};
            this._modelEvents = this._modelEvents || {};
            this._viewsEvents = this._viewsEvents || {};
            this._timeoutIds = [];
        },

        constructor = function (options) {
            if (!this._constructorExecuted &&
                (this instanceof Marionette.LayoutView ||
                 this instanceof Marionette.ItemView ||
                 this instanceof Marionette.View)) {
                initOptions.call(this, options);
                utils.foo(this, '_initRegions');
                utils.foo(this, '_initModel');
                utils.foo(this, '_listenEvents');
                this._constructorExecuted = true;
            }
        },

        constructorLayoutView = Marionette.LayoutView,
        constructorItemView = Marionette.ItemView,
        constructorView = Marionette.View;

    //extend layout, itemview and view classes

    Marionette.LayoutView = constructorLayoutView.extend({
        constructor: function (options) {
            constructor.apply(this, arguments);
            constructorLayoutView.apply(this, arguments);
        }
    });

    Marionette.ItemView = constructorItemView.extend({
        constructor: function (options) {
            constructor.apply(this, arguments);
            constructorItemView.apply(this, arguments);
        }
    });

    Marionette.View = constructorView.extend({
        constructor: function (options) {
            constructor.apply(this, arguments);
            constructorView.apply(this, arguments);
        }
    });

});