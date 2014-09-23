define(['utils'], function (utils) {

    //extend view class

    _.extend(Backbone.View.prototype, {

        //timeout and interval methods

        setInterval: function(callback, time) {
            var args = utils.sliceArguments(arguments, 2),
                id = setInterval(this[callback].bind(this, args), time || 0);
            this._intervalsIds.push(id);
        },

        clearIntervals: function () {
            _.each(this._intervalsIds, clearInterval.bind(window));
        },

        setTimeout: function(callback, time) {
            var args = utils.sliceArguments(arguments, 2),
                id = setTimeout(this[callback].bind(that, args), time || 0);
            this._timeoutIds.push(id);
        },

        clearTimeouts: function () {
            _.each(this.timeoutIds, clearTimeout.bind(window));
        }

    });
});