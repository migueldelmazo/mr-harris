define(['utils'], function (utils) {

    var //dom events

        listenDomEvents = function () {
            var events = {};
            _.each(utils.foo(this, '_domEvents'), function (actions, selector) {
                events[selector] = onDomEvent.bind(this, actions);
            }, this);
            this.events = events; //set _domEvents in backbone attribute
        },

        onDomEvent = function (actions, ev) {
            ev.preventDefault();
            ev.stopPropagation();
            this.runActions(actions, ev);
        },

        //app events

        listenAppEvents = function () {
            _.each(utils.foo(this, '_appEvents'), function (actions, eventName) {
                this.listenTo(this.app.vent, eventName, onAppEvent.bind(this, actions));
            }, this);
        },

        onAppEvent = function (actions) {
            this.runActions(actions);
        };

    //extend view class

    _.extend(Backbone.View.prototype, {

        //extend this.events with all event types
        _initEvents: function (options) {
            listenDomEvents.call(this);
            listenAppEvents.call(this);
        }

    });
});
