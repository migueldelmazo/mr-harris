define(['utils'], function (utils) {

    var //runAction helpsers

        getValue = function (action) {
            switch (action.from) {
                case 'dom':
                    return utils.dom.getValue(this.get$ElByAttr(action.fromItem));
                case 'model':
                    return action.fromFn ? this._modelInstance[action.fromFn]() : utils.foo(this._modelInstance.toJSON(), action.fromItem);
                case 'view':
                    return utils.foo(this, action.fromItem, undefined, action);
                default:
                    return action.value;
            }
        };

    //extend view class

    _.extend(Backbone.View.prototype, {

        //run actions on view

        runActions: function (actions) {
            var args = utils.sliceArguments(arguments, 1);
            _.each(actions, function (action) {
                this.runAction.apply(this, [action].concat(args));
            }, this);
        },

        runAction: function (action) {
            var methodArgs = utils.sliceArguments(arguments, 1),
                fooArgs = [this, action.action, undefined, action, getValue.call(this, action)];
            utils.foo.apply(this, fooArgs.concat(methodArgs));
        },

        //actions helpers

        //dom, model and view
        set: function (action, value) {
            switch (action.to) {
                case 'dom':
                    return utils.dom.setValue(this.get$ElByAttr(action.toItem), value);
                case 'model':
                    return this._modelInstance.set(action.toItem, value);
                case 'view':
                    return this[action.toItem] = value;
            }
        },

        //app
        triggerToApp: function (action, value) {
            this.app.appEventTrigger(action.ev, value, action.params);
        },

        //dom
        getActionEl: function (action) {
            return this.getElByAttr(action.el);
        },

        getAction$El: function (action) {
            return this.get$ElByAttr(action.el);
        },

        getElByAttr: function (els, attr) {
            attr = attr || 'js';
            return _.map(utils.parseArray(els), function (item) {
                return '[' + attr + '="'+ item + '"]';
            }).join(',');
        },

        get$ElByAttr: function (el) {
            return this.$(this.getElByAttr(el));
        },

        toggle: function (action, value) {
            this.$(this.getActionEl(action)).toggleClass('hidden', !value);
        },

        toggleAttr: function (action, value) {
            this.$(this.getActionEl(action)).attr(action.property, !value);
        },

        toggleClass: function (action, value) {
            this.$(this.getActionEl(action)).toggleClass(action.className, !!value);
        },

        toggleProperty: function (action, value) {
            this.$(this.getActionEl(action)).prop(action.property, !value);
        },

        triggerToDom: function (action, value) {
            var $el = this.getAction$El(action);
            _.each(utils.parseArray(action.events), function (eventName) {
                $el.trigger(eventName);
            });
        },

        //model
        runModelMethod: function (action, value) {
            utils.foo(this._modelInstance, action.method, undefined, value);
        },

        triggerToModel: function (action) {
            this._modelInstance.trigger(action.ev);
        },

        //view
        runViewMethod: function (action) {
            var methodArgs = utils.sliceArguments(arguments, 1),
                fooArgs = [this, action.method, undefined, action];
            utils.foo.apply(this, fooArgs.concat(methodArgs));
        },

        triggerToParent: function (action) {
            this.trigger(action.ev);
        },

        updateChild: function (action) {
            var view = this.findView(action.viewName),
                method = action.method || 'update',
                methodArgs = utils.sliceArguments(arguments, 1),
                fooArgs = [view, method, undefined];
            utils.foo.apply(view, fooArgs.concat(methodArgs));
        },

        //reports
        createReport: function (action) {
            utils.reports.create(action.value);
        }

    });
});
