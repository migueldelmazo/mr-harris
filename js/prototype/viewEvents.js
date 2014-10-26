define(['utils'], function (utils) {

    var //_listenEvents helpers

        listenDomEvents = function () {
            var events = {};
            _.each(this._domEvents, function (actions, selector) {
                events[selector] = onDomEvent.bind(this, actions);
            }, this);
            this.events = events; //set _domEvents in backbone attribute
        },

        onDomEvent = function (actions, ev) {
            ev.preventDefault();
            ev.stopPropagation();
            this.runActions(actions, ev);
        },

        listenAppEvents = function () {
            _.each(this._appEvents, function (actions, eventName) {
                this.listenTo(this.app.vent, eventName, onAppEvent.bind(this, actions));
            }, this);
        },

        onAppEvent = function (actions) {
            this.runActions(actions);
        };

    //extend view class

    _.extend(Backbone.View.prototype, {

        _listenEvents: function (options) {
            listenDomEvents.call(this);
            listenAppEvents.call(this);
        }

    });
});
