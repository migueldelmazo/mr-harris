define(['utils'], function (utils) {

    var closeController = function () {
            var controller = this.controller;
            if (controller) {
                controller.destroy();
            }
        };

    _.extend(Marionette.Region.prototype, {

        setController: function (controller) {
            closeController.call(this);
            this.controller = controller;
        },

        getController: function () {
            return this.controller || {};
        },

        onBeforeDestroy: function () {
            debugger;
        }

    });
});