define(['utils'], function (utils) {

    //extend model class

    _.extend(Backbone.Model.prototype, {

        appEventOn: function (event, callback) {
            callback = _.isFunction(callback) ? callback : this[callback];
            this.listenTo(this.app.channel, event, callback, this);
        }

    });
});
