define(['utils'], function (utils) {

    var getValue = function (action) {
        var fromAttr = action.fromAttr;
        return fromAttr ? this.get(fromAttr) : action.value;
    };

    //extend model class

    _.extend(Backbone.Model.prototype, {

        runActions: function (actions) {
            _.each(actions, this.runAction.bind(this));
        },

        runAction: function (action) {
            utils.foo(this, action.action, undefined, action);
        },

        //actions helpers

        setAttr: function (action) {
            this.set(action.toAttr, getValue.call(this, action));
        },

        triggerEvent: function (action) {
            this.trigger(action.ev);
        }

    });
});
