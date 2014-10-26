define(['utils'], function (utils) {

    //extend application class

    _.extend(Marionette.Application.prototype, {

        _initAppEvents: function () {
            this.channel = new Backbone.Wreqr.EventAggregator();
            this.listenTo(this.channel, 'logout', this.logout);
        },

        appEventOn: function (eventName, callback, context) {
            this.channel.on(eventName, callback, context);
        },

        appEventOnce: function (eventName, callback, context) {
            this.channel.once(eventName, callback, context);
        },

        appEventTrigger: function (eventName, callback, context) {
            this.channel.trigger(eventName, callback, context);
        },

        //logout the application
        logout: function () {
            utils.reports.create('logout app');
        }

    });
});
