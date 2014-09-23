define(['utils'], function (utils) {

    var //view and model binds

        setBindings = function () {
            _.each(this._modelBinds, function (item) {
                item = _.isString(item) ? { model: item, dom: item } : item;
                setBindingsInModel.call(this, item);
                setBindingsInDom.call(this, item);
            }, this);
        },

        setBindingsInModel = function (item) {
            var modelEvent = 'set:' + item.model,
                modelEvents = this._modelEvents[modelEvent],
                action = [{ action: 'set', from: 'model', to: 'dom', fromItem: item.model, toItem: item.dom }];
            this._modelEvents[modelEvent] = modelEvents ? action.concat(modelEvents) : action;
        },

        setBindingsInDom = function (item) {
            var eventNames = utils.parseArray(item.domEvents || ['keyup', 'change']);
            _.each(eventNames, function (eventName) {
                setBindingsInDomByEventName.call(this, eventName, item);
            }, this);
        },

        setBindingsInDomByEventName = function (eventName, item) {
            var domEvent = eventName + ' ' + this.getElByAttr(item.dom),
                domEvents = this._domEvents[domEvent],
                action = [{ action: 'set', from: 'dom', to: 'model', fromItem: item.dom, toItem: item.model }];
            this._domEvents[domEvent] = domEvents ? action.concat(domEvents) : action;
        },

        //manage model events to view

        initModelEvents = function () {
            _.each(this._modelEvents, function (actions, ev) {
                this._modelInstance.on(ev, onModelEvents.bind(this, actions, ev));
            }, this)
        },

        onModelEvents = function (actions) {
            this.runActions(actions);
        };

    //extend view class

    _.extend(Backbone.View.prototype, {

        _initModel: function () {
            if (this._model) {
                this._modelOptions = _.extend({}, this._modelOptions, { app: this.app });
                this._modelInstance = utils.classes.instance('model', this._model, {}, this._modelOptions);
                setBindings.call(this);
                initModelEvents.call(this);
            }
        }

    });
});