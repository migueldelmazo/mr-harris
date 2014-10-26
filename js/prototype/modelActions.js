define(['utils'], function (utils) {

    var getValue = function (action) {
        var fromAttr = action.fromAttr;
        return fromAttr ? this.get(fromAttr) : action.value;
    };

    //extend model class

    _.extend(Backbone.Model.prototype, {

        runActions: function (actions) {
            var args = utils.sliceArguments(arguments, 1);
            _.each(actions, function (action) {
                this.runAction.apply(this, [action].concat(args));
            }, this);
        },

        runAction: function (action) {
            var methodArgs = utils.sliceArguments(arguments, 1),
                fooArgs = [this, action.action, undefined, action, getValue.call(this, action)];
            utils.foo.apply(this, fooArgs.concat(methodArgs));
        },

        //actions helpers

        setAttr: function (action) {
            this.set(action.toAttr, getValue.call(this, action));
        },

        triggerEvent: function (action) {
            this.trigger(action.ev);
        },

        runModelMethod: function (action) {
            var methodArgs = utils.sliceArguments(arguments, 1),
                fooArgs = [this, action.method, undefined];
            utils.foo.apply(this, fooArgs.concat(methodArgs));
        }

    });
});
