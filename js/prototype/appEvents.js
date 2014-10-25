define(['utils'], function (utils) {

    //extend application class

    _.extend(Marionette.Application.prototype, {

        _initAppEvents: function () {
            this.vent = new Backbone.Wreqr.EventAggregator();
            this.listenTo(this.vent, 'logout', this.logout);
        },

        appEventOn: function (eventName, callback, context) {
            this.vent.on(eventName, callback, context);
        },

        appEventOnce: function (eventName, callback, context) {
            this.vent.once(eventName, callback, context);
        },

        //logout the application
        logout: function () {
            utils.reports.create('logout app');
        }

    });
});
