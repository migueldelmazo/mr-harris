define(['utils'], function (utils) {

    //extend controller class

    _.extend(Marionette.Controller.prototype, {

        runActions: function (actions, options) {
            var args = utils.sliceArguments(arguments, 1);
            _.each(actions, function (action) {
                this.runAction.apply(this, [action].concat(args));
            }, this);
        },

        runAction: function (action, options) {
            var methodArgs = utils.sliceArguments(arguments, 1),
                fooArgs = [this, action.action, undefined, action];
            utils.foo.apply(this, fooArgs.concat(methodArgs));
        },

        showInParentView: function (action) {
            this.parentView.showView({
                view: action.view,
                region: this.regionName
            });
        }

    });
});
