define(['utils'], function (utils) {

    var //initModel helpers

        getOptions = function () {
            return {
                app: this.app,
                viewName: this._name
            };
        },

        //view and model binds

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

        listenModelEvents = function () {
            _.each(this._modelEvents, function (actions, eventName) {
                this.listenTo(this._modelInstance, eventName, onModelEvents.bind(this, actions, eventName));
            }, this)
        },

        onModelEvents = function (actions) {
            this.runActions(actions);
        },

        //destroyModel helpers

        storeModelInAppInstance = function (modelInstance) {
            utils.storage.appInstanceSet('model:' + this._name + ':' + modelInstance._name, modelInstance.toJSON());
        };

    //extend view class

    _.extend(Backbone.View.prototype, {

        _initModel: function () {
            if (this._model) {
                this._modelOptions = _.extend({}, this._modelOptions, { app: this.app });
                this._modelInstance = utils.classes.instance('model', this._model.model, {}, getOptions.call(this));
                setBindings.call(this);
                listenModelEvents.call(this);
            }
        },

        _destroyModel: function () {
            var modelInstance = this._modelInstance;
            if (modelInstance) {
                storeModelInAppInstance.call(this, modelInstance);
                modelInstance.close();
            }
        }

    });
});