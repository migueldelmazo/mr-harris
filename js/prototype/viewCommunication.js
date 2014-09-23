define(['utils'], function (utils) {

    var //runViewsMethod helpers

        runViewsMethodCall = function (method, data, options, _isTriggerView, down2Up) {
            if (!options.down2Up === down2Up && !_isTriggerView) {
                utils.foo(this, method, undefined, data);
            }
        },

        //recursively method
        runChildViewsMethod = function (method, data, options, _isTriggerView) {
            _.each(this.getRegions, function (region) {
                var currentView = region.currentView;
                if (currentView) {
                    currentView.runViewsMethod(method, data, options, _isTriggerView);
                }
            });
        };

    _.extend(Backbone.View.prototype, {

        appEventTrigger: function (event, data) {
            this.app.vent.trigger(event, data);
        },

        //hierarchy views communication

        runParentMethod: function (method, data, _isTriggerView) {
            _isTriggerView = _isTriggerView === undefined;
            if (!_isTriggerView) {
                utils.foo(this, method, undefined, data);
            }
            this.trigger('runParentMethod', method, data, _isTriggerView);
        },

        runViewsMethod: function (method, data, options, _isTriggerView) {
            options = options || {};
            _isTriggerView = _isTriggerView === undefined;
            runViewsMethodCall.call(this, method, data, options, _isTriggerView, true); //call method if hierarchy down to up
            runChildViewsMethod.call(this, method, data, options, _isTriggerView); //call child views method
            runViewsMethodCall.call(this, method, data, options, _isTriggerView, false); //call method if hierarchy up to down
        }

    });
});